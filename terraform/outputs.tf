output "website_bucket_name" {
  description = "S3 bucket name for the website"
  value       = aws_s3_bucket.website.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "contact_api_endpoint" {
  description = "API Gateway endpoint for contact form"
  value       = aws_apigatewayv2_api.contact_api.api_endpoint
}

output "acm_certificate_arn" {
  description = "ACM certificate ARN"
  value       = aws_acm_certificate.website.arn
}

output "ses_verification_token" {
  description = "SES domain verification token (add as TXT record)"
  value       = aws_ses_domain_identity.website.verification_token
}

output "nameservers_note" {
  description = "DNS configuration instructions"
  value       = <<-EOT
    
    ┌──────────────────────────────────────────────────────────┐
    │ DNS CONFIGURATIE                                        │
    │                                                         │
    │ Voeg de volgende DNS records toe:                       │
    │                                                         │
    │ 1. CNAME: ${var.domain_name}                            │
    │    → ${aws_cloudfront_distribution.website.domain_name} │
    │                                                         │
    │ 2. CNAME: ${var.www_domain_name}                        │
    │    → ${aws_cloudfront_distribution.website.domain_name} │
    │                                                         │
    │ 3. TXT: _amazonses.${var.domain_name}                   │
    │    → SES verification token (zie output hierboven)      │
    │                                                         │
    │ 4. ACM DNS validation records                           │
    │    → Zie AWS Console voor CNAME records                 │
    └──────────────────────────────────────────────────────────┘
  EOT
}
