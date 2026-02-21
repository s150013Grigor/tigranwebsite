# ─────────────────────────────────────────────
# IAM Role for Lambda
# ─────────────────────────────────────────────

resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}-contact-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}-lambda-role"
    Environment = var.environment
  }
}

resource "aws_iam_role_policy" "lambda_ses_policy" {
  name = "${var.project_name}-lambda-ses-policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::${var.domain_name}",
          "arn:aws:s3:::${var.domain_name}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "codebuild:StartBuild",
          "codebuild:BatchGetBuilds"
        ]
        Resource = [
          aws_codebuild_project.website_deploy.arn
        ]
      }
    ]
  })
}

# ─────────────────────────────────────────────
# Lambda Function
# ─────────────────────────────────────────────

data "archive_file" "contact_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda/contact-form"
  output_path = "${path.module}/files/contact-form.zip"
}

resource "aws_lambda_function" "contact_form" {
  filename         = data.archive_file.contact_lambda.output_path
  function_name    = "${var.project_name}-contact-form"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.contact_lambda.output_base64sha256
  timeout          = 10
  memory_size      = 128

  environment {
    variables = {
      CONTACT_EMAIL = var.contact_email
      SENDER_EMAIL  = "noreply@${var.domain_name}"
      DOMAIN_NAME   = var.domain_name
    }
  }

  tags = {
    Name        = "${var.project_name}-contact-lambda"
    Environment = var.environment
  }
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_api.execution_arn}/*/*"
}

# ─────────────────────────────────────────────
# CMS Lambda Function
# ─────────────────────────────────────────────

data "archive_file" "cms_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda/cms-api"
  output_path = "${path.module}/files/cms-api.zip"
}

resource "aws_lambda_function" "cms_api" {
  filename         = data.archive_file.cms_lambda.output_path
  function_name    = "${var.project_name}-cms-api"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.cms_lambda.output_base64sha256
  timeout          = 30
  memory_size      = 256

  environment {
    variables = {
      CMS_BUCKET     = aws_s3_bucket.website.bucket
      AUTH_USERNAME   = "tmedia"
      AUTH_PASSWORD   = "Tik!werk2007"
      JWT_SECRET      = "tigranmedia-cms-secret-2024-prod"
      CODEBUILD_PROJECT = aws_codebuild_project.website_deploy.name
    }
  }

  tags = {
    Name        = "${var.project_name}-cms-lambda"
    Environment = var.environment
  }
}

resource "aws_lambda_permission" "cms_api_gateway" {
  statement_id  = "AllowCMSAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cms_api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_api.execution_arn}/*/*"
}

# ─────────────────────────────────────────────
# API Gateway v2 (HTTP API)
# ─────────────────────────────────────────────

resource "aws_apigatewayv2_api" "contact_api" {
  name          = "${var.project_name}-contact-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [
      "https://${var.domain_name}",
      "https://${var.www_domain_name}",
      "http://localhost:3000"
    ]
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
    max_age       = 3600
  }

  tags = {
    Name        = "${var.project_name}-api"
    Environment = var.environment
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.contact_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "contact_lambda" {
  api_id                 = aws_apigatewayv2_api.contact_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_form.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_integration" "cms_lambda" {
  api_id                 = aws_apigatewayv2_api.contact_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.cms_api.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact_post" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "POST /api/contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact_lambda.id}"
}

# CMS API routes
resource "aws_apigatewayv2_route" "cms_any" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "ANY /api/cms/{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.cms_lambda.id}"
}

# ─────────────────────────────────────────────
# SES Email Identity (verify domain for sending)
# ─────────────────────────────────────────────

resource "aws_ses_domain_identity" "website" {
  domain = var.domain_name
}

resource "aws_ses_email_identity" "contact" {
  email = var.contact_email
}
