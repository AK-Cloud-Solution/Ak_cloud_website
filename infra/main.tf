resource "random_string" "suffix" {
  length  = 5
  upper   = false
  special = false
}

locals {
  resource_prefix = "${var.name_prefix}-${random_string.suffix.result}"
  acr_name        = "${replace(var.name_prefix, "-", "")}${random_string.suffix.result}acr"
  backend_image   = var.image_tag == "bootstrap" ? "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest" : "${azurerm_container_registry.main.login_server}/akcloud-backend:${var.image_tag}"
  frontend_image  = var.image_tag == "bootstrap" ? "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest" : "${azurerm_container_registry.main.login_server}/akcloud-frontend:${var.image_tag}"
}

resource "azurerm_resource_group" "main" {
  name     = "${local.resource_prefix}-rg"
  location = var.location
}

resource "azurerm_container_registry" "main" {
  name                = local.acr_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = false
}

resource "azurerm_log_analytics_workspace" "main" {
  name                = "${local.resource_prefix}-logs"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "main" {
  name                       = "${local.resource_prefix}-env"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
}

resource "azurerm_user_assigned_identity" "container_apps" {
  name                = "${local.resource_prefix}-identity"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_role_assignment" "acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.container_apps.principal_id
}

resource "azurerm_container_app" "backend" {
  name                         = "${local.resource_prefix}-backend"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.container_apps.id]
  }

  registry {
    server   = azurerm_container_registry.main.login_server
    identity = azurerm_user_assigned_identity.container_apps.id
  }

  secret {
    name  = "mongo-uri"
    value = var.mongo_uri
  }

  secret {
    name  = "admin-key"
    value = var.admin_key
  }

  secret {
    name  = "jwt-secret"
    value = var.jwt_secret
  }

  secret {
    name  = "email-user"
    value = var.email_user
  }

  secret {
    name  = "email-pass"
    value = var.email_pass
  }

  ingress {
    external_enabled = true
    target_port      = 8080
    transport        = "auto"
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  template {
    min_replicas = 1
    max_replicas = 2

    container {
      name   = "akcloud-backend"
      image  = local.backend_image
      cpu    = 0.5
      memory = "1Gi"

      env {
        name        = "MONGO_URI"
        secret_name = "mongo-uri"
      }

      env {
        name        = "ADMIN_KEY"
        secret_name = "admin-key"
      }

      env {
        name        = "JWT_SECRET"
        secret_name = "jwt-secret"
      }

      env {
        name        = "EMAIL_USER"
        secret_name = "email-user"
      }

      env {
        name        = "EMAIL_PASS"
        secret_name = "email-pass"
      }

      env {
        name  = "PORT"
        value = "8080"
      }
    }
  }

  depends_on = [azurerm_role_assignment.acr_pull]
}

resource "azurerm_container_app" "frontend" {
  name                         = "${local.resource_prefix}-frontend"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.container_apps.id]
  }

  registry {
    server   = azurerm_container_registry.main.login_server
    identity = azurerm_user_assigned_identity.container_apps.id
  }

  ingress {
    external_enabled = true
    target_port      = 80
    transport        = "auto"
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  template {
    min_replicas = 1
    max_replicas = 2

    container {
      name   = "akcloud-frontend"
      image  = local.frontend_image
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }

  depends_on = [azurerm_role_assignment.acr_pull]
}
