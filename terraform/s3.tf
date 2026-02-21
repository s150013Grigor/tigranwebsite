# ─────────────────────────────────────────────
# S3 Bucket for Static Website Hosting
# ─────────────────────────────────────────────

resource "aws_s3_bucket" "website" {
  bucket = var.domain_name

  tags = {
    Name        = "${var.project_name}-website"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404/index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontOAI"
        Effect    = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.website.iam_arn
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.website.arn}/*"
      }
    ]
  })
}

# ─────────────────────────────────────────────
# S3 Bucket for WWW redirect
# ─────────────────────────────────────────────

resource "aws_s3_bucket" "www_redirect" {
  bucket = var.www_domain_name

  tags = {
    Name        = "${var.project_name}-www-redirect"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_website_configuration" "www_redirect" {
  bucket = aws_s3_bucket.www_redirect.id

  redirect_all_requests_to {
    host_name = var.domain_name
    protocol  = "https"
  }
}
