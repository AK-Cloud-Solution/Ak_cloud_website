output "resource_group_name" {
  value = azurerm_resource_group.main.name
}

output "acr_name" {
  value = azurerm_container_registry.main.name
}

output "acr_login_server" {
  value = azurerm_container_registry.main.login_server
}

output "backend_container_app_name" {
  value = azurerm_container_app.backend.name
}

output "backend_url" {
  value = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
}

output "frontend_container_app_name" {
  value = azurerm_container_app.frontend.name
}

output "frontend_url" {
  value = "https://${azurerm_container_app.frontend.latest_revision_fqdn}"
}
