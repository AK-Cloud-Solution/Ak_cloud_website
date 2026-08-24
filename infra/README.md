# Azure deployment

This Terraform stack creates:

- An Azure Container Registry with admin access disabled.
- A Container Apps Environment and Log Analytics workspace.
- A user-assigned identity with `AcrPull` access.
- One public backend Container App listening on port 8080.
- One public frontend Container App serving the Nginx bundle on port 80.

The GitHub Actions workflow provisions the stack with public bootstrap images, builds and pushes `akcloud-frontend` and `akcloud-backend` in parallel, then waits for approval on the GitHub `production` environment before applying the pushed commit tag to Container Apps.

## GitHub configuration

Create these GitHub Actions secrets:

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_CREDENTIALS` (use this JSON secret for the workflows)
- `MONGO_URI`
- `ADMIN_KEY`
- `JWT_SECRET`
- `EMAIL_USER` (optional)
- `EMAIL_PASS` (optional)

The workflows use `AZURE_CREDENTIALS`, a JSON secret containing `clientId`, `clientSecret`, `subscriptionId`, and `tenantId`. Configure it as a repository secret, or on every environment used by the workflow. Rotate the client secret before it expires and never commit this value to the repository.

The workflows use service-principal authentication with the client secret. Grant the service principal `Contributor` on the deployment resource group or subscription and `User Access Administrator` if it must create the `AcrPull` role assignment.

Push to `main` or run the `Provision, Build and Deploy AK Cloud` workflow manually. Configure at least one required reviewer for the `production` environment under repository Settings > Environments. The deployment URLs are printed in the final workflow step.

The GitHub Actions identity also needs `AcrPush` on the created registry so the image jobs can run `az acr login` and push images. The Container Apps identity receives `AcrPull` from Terraform.

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
