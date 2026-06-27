# Environment variables

Add these to `.env` in the backend root. Where each variable is read:

| Variable | Used in | Purpose |
|----------|---------|---------|
| **PORT** | `src/index.ts` | Server port (default: 3000) |
| **NODE_ENV** | `src/config/data-source.ts` | `development` / `production` – controls DB sync & logging |
| **PG_HOST** | `src/config/data-source.ts` | PostgreSQL host |
| **PG_PORT** | `src/config/data-source.ts` | PostgreSQL port |
| **PG_USER** | `src/config/data-source.ts` | PostgreSQL user |
| **PG_PASSWORD** | `src/config/data-source.ts` | PostgreSQL password |
| **PG_DATABASE** | `src/config/data-source.ts` | PostgreSQL database name |
| **SECRET_KEY** | `src/usecase/user.usecase.ts`, `src/middlewares/auth.ts` | JWT signing/verification |
| **CORS_ORIGIN** | `src/app.ts` | Allowed frontend origin (e.g. Vite dev server) |
| **COOKIE_SECRET** | `src/app.ts` | Cookie signing secret |
| **CLOUD_NAME** | `src/utils/cloudinary.ts` | Cloudinary cloud name |
| **API_KEY** | `src/utils/cloudinary.ts` | Cloudinary API key |
| **API_SECRET** | `src/utils/cloudinary.ts` | Cloudinary API secret |

## Ready-to-copy `.env` template

```env
# Server
PORT=3000
NODE_ENV=development

# PostgreSQL (create DB "jobscan" first)
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=jobscan

# Auth (use a long random string in production)
SECRET_KEY=your-jwt-secret-key-change-in-production

# CORS (frontend URL – Vite default)
CORS_ORIGIN=http://localhost:5173

# Cookie (optional, for signing cookies)
COOKIE_SECRET=jobscan-cookie-secret

# Cloudinary (dashboard: https://cloudinary.com/console)
CLOUD_NAME=your-cloud-name
API_KEY=your-api-key
API_SECRET=your-api-secret
```

## Where to get values

- **PostgreSQL**: Local install or Docker. Create database: `CREATE DATABASE jobscan;`
- **SECRET_KEY**: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **CORS_ORIGIN**: Your frontend URL (e.g. `http://localhost:5173` for Vite)
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) → Dashboard → API Keys
