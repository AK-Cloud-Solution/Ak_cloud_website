# Azure deployment

This Terraform stack creates:

- An Azure Container Registry with admin access disabled.
- A Container Apps Environment and Log Analytics workspace.
- A user-assigned identity with `AcrPull` access.
- One public backend Container App listening on port 8080.
- One public frontend Container App serving the Nginx bundle on port 80.

The GitHub Actions workflow applies the stack once with public bootstrap images, pushes `akcloud-frontend` and `akcloud-backend` to ACR, then applies again with the pushed commit tag.

## GitHub configuration

Create these GitHub Actions secrets:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `MONGO_URI`
- `ADMIN_KEY`
- `JWT_SECRET`
- `EMAIL_USER` (optional)
- `EMAIL_PASS` (optional)

Configure Azure federated credentials for the GitHub Actions service principal. Grant it `Contributor` on the deployment resource group or subscription and `User Access Administrator` if it must create the `AcrPull` role assignment.

Push to `main` or run the `Build and deploy AK Cloud` workflow manually. The deployment URL is printed in the final workflow step.

## Local Terraform validation

From the repository root:

```bash
terraform -chdir=infra init
terraform -chdir=infra validate
terraform -chdir=infra plan \
  -var='subscription_id=<subscription-id>' \
  -var='mongo_uri=<mongo-uri>' \
  -var='admin_key=<admin-key>' \
  -var='jwt_secret=<jwt-secret>'
```

Do not commit a `.tfvars` file containing secrets. Terraform state contains Container App secret values and should use a secured remote backend for shared or production deployments.
