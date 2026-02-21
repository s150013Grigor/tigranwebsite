variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-west-1"
}

variable "domain_name" {
  description = "Primary domain name for the website"
  type        = string
  default     = "tigranmedia.be"
}

variable "www_domain_name" {
  description = "WWW subdomain"
  type        = string
  default     = "www.tigranmedia.be"
}

variable "contact_email" {
  description = "Email address for contact form submissions"
  type        = string
  default     = "info@tigranmedia.be"
}

variable "contact_phone" {
  description = "Phone number"
  type        = string
  default     = "+32474114899"
}

variable "environment" {
  description = "Environment name (e.g., production, staging)"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "tigranmedia"
}
