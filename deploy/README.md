# Deployment

- `docker/` contains the frontend and backend container definitions.
- `infra/` contains the Azure Container Apps Terraform stack.
- `.github/workflows/ci.yml` builds the frontend and syntax-checks backend code on pull requests and pushes to `main` or `develop`.
- `.github/workflows/provision-infra.yml` validates, plans, and provisions Terraform when `infra/**` changes.
- `.github/workflows/deploy-website.yml` runs for every `feature/**` push, builds both Docker images in parallel, pushes immutable commit tags to ACR, and deploys after `production` approval.

Both workflows use an Azure Blob Storage Terraform backend. Create the storage account and blob container first, then configure these GitHub secrets: `TF_STATE_RESOURCE_GROUP`, `TF_STATE_STORAGE_ACCOUNT`, and `TF_STATE_CONTAINER`. Configure required reviewers on the `production` environment to enable deployment approval. Configure required reviewers on `infrastructure` if Terraform changes also need approval.