# AK Cloud Enterprise

AK Cloud Enterprise is an interactive cloud-platform experience built with React, TypeScript, Vite, and Tailwind CSS.

The public website is driven by a small content API and a dedicated admin studio. If the API is unavailable, the public website safely renders the bundled default content.

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) 18 or newer
- npm 9 or newer
- Git

Confirm the installation:

```bash
node --version
npm --version
git --version
```

## Run locally

1. Clone the repository and enter the project directory:

   ```bash
   git clone <repository-url>
   cd AK_CLOUD_ENTERPRISE
   ```

2. Install the locked dependencies:

   ```bash
   npm ci
   ```

3. Install the API dependencies:

   ```bash
   cd server
   npm ci
   cd ..
   ```

4. Create `server/.env`:

   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/akcloud
   ADMIN_KEY=replace-with-a-long-random-admin-key
   JWT_SECRET=replace-with-a-long-random-secret
   ```

5. Create a root `.env.local` file:

   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

6. Ensure MongoDB is running, then start the website and API:

   ```bash
   npm run dev
   ```

7. Open the public website:

   ```text
   http://localhost:5173
   ```

8. Open the content-management studio:

   ```text
   http://localhost:5173/admin
   ```

Enter the value of `ADMIN_KEY` in the Publishing section before publishing changes.

### Frontend-only mode

To work only on the public UI:

   ```bash
   npm run start:frontend
   ```

Open the address printed in the terminal, normally:

   ```text
   http://localhost:5173
   ```

If port `5173` is occupied, Vite automatically selects another available port.

## Content administration

The public website has no sign-in, registration, or user-dashboard flow.

- `GET /api/content` returns the published website content.
- `PUT /api/content` publishes content from `/admin`.
- Publishing requires the `x-admin-key` header to match the server’s `ADMIN_KEY`.
- Content is persisted in MongoDB.
- The bundled dummy content is shown if the content API cannot be reached.

The admin studio currently manages hero copy, metrics, clients, capabilities, contact details, and company/footer information.

## Production build

Create an optimized production bundle:

```bash
npm run build
```

The output is written to `build/`.

Preview the production bundle locally:

```bash
npx vite preview
```

## TypeScript validation

Run the compiler without generating files:

```bash
npx tsc --noEmit
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run start:frontend` | Start the frontend development server |
| `npm run build` | Generate the optimized production build |
| `npm run dev` | Start the frontend and content API together |
| `npm run start:backend` | Start only the content API/backend |
| `npx tsc --noEmit` | Validate TypeScript |

## Backend configuration

The `server/` directory contains the Express and MongoDB content API.

To run it:

1. Install [MongoDB](https://www.mongodb.com/docs/manual/installation/) locally or create a MongoDB Atlas database.

2. Install backend dependencies:

   ```bash
   cd server
   npm ci
   ```

3. Create `server/.env`:

   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/akcloud
   ADMIN_KEY=replace-with-a-long-random-admin-key
   JWT_SECRET=replace-with-a-long-random-secret
   EMAIL_USER=
   EMAIL_PASS=
   ```

4. Start the backend:

   ```bash
   npm run dev
   ```

5. To connect the frontend to it, create a root `.env.local` file:

   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

For production, set `VITE_API_URL` to the deployed API URL before running `npm run build`.

## Troubleshooting

### `vite: command not found`

Install dependencies from the repository root:

```bash
npm ci
```

### Port already in use

Run Vite on a specific port:

```bash
npm run start:frontend -- --port 5174
```

### Admin page shows “Using fallback data”

Confirm that MongoDB and the backend are running, and verify `VITE_API_URL` points to the API.

### Publishing returns “Invalid admin key”

Enter the exact `ADMIN_KEY` value configured in `server/.env`, then publish again.
