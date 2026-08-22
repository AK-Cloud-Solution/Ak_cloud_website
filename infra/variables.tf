variable "subscription_id" {
  description = "Azure subscription ID used for deployment."
  type        = string
}

variable "location" {
  description = "Azure region for the deployment."
  type        = string
  default     = "eastus"
}

variable "name_prefix" {
  description = "Lowercase project prefix used in Azure resource names."
  type        = string
  default     = "akcloud"

  validation {
    condition     = can(regex("^[a-z0-9-]{3,20}$", var.name_prefix))
    error_message = "name_prefix must be 3-20 characters containing only lowercase letters, numbers, and hyphens."
  }
}

variable "mongo_uri" {
  description = "MongoDB connection string for the API."
  type        = string
  sensitive   = true
}

variable "admin_key" {
  description = "Secret required to publish content from the admin studio."
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "Secret used to sign API tokens."
  type        = string
  sensitive   = true
}

variable "email_user" {
  description = "Optional SMTP username."
  type        = string
  default     = ""
  sensitive   = true
}

variable "email_pass" {
  description = "Optional SMTP password."
  type        = string
  default     = ""
  sensitive   = true
}

variable "image_tag" {
  description = "Container image tag initially configured on the Container App."
  type        = string
  default     = "bootstrap"
}
