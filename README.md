Flamex POS Backend (Node.js / Express / Prisma)
==============================================

A TypeScript REST API for the Flamex point-of-sale system. The service uses Express 5, Prisma ORM, PostgreSQL, Redis, and JWT+session-based auth to manage orders, menu items, customers, riders, expenses, business info, and reports. API routes are mounted under `/api` with a health check at `/health`.

## Stack
- Node.js 18+, TypeScript, Express 5
- PostgreSQL + Prisma Client (Prisma 7)
- Redis for caching/rate limiting
- Helmet, CORS, compression, morgan logging, express-session
- Jest + Supertest for tests

## Prerequisites
- Node.js >= 18 and npm
- PostgreSQL and Redis (or use Docker, see below)
- Open USB access if using thermal printer integration

## Quickstart (local)
1) Install dependencies  
`npm install`

2) Create a `.env` file in `flamex-server/` (sample below).

3) Generate Prisma client, run migrations, and seed sample data  
`npm run setup`

4) Start the dev server (watches/compiles with ts-node-dev)  
`npm run dev`

5) Build and run production bundle (uses `dist/`)  
`npm run build` then `npm start`

Default API base: `http://localhost:5001/api`

## Environment variables
Copy this template to `.env` and adjust for your environment:
```
NODE_ENV=development
PORT=5001
API_VERSION=v1
APP_NAME=Flamex POS
DOMAIN=localhost

# Postgres (DATABASE_URL is required)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flamex_pos?schema=public
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=flamex_pos
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
# REDIS_PASSWORD=

# JWT & Session
JWT_SECRET=change-me-to-32-characters-minimum
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=change-me-to-32-characters-minimum
JWT_REFRESH_EXPIRES_IN=30d
SESSION_SECRET=change-me-to-32-characters-minimum
SESSION_COOKIE_MAX_AGE=604800000

# CORS
CORS_ORIGIN=http://localhost:3000
CORS_ORIGIN_LOCAL_HOST=http://127.0.0.1:3000
CORS_CREDENTIALS=true

# Optional printer defaults
PRINTER_VENDOR_ID=
PRINTER_PRODUCT_ID=
PRINTER_PORT=USB001

# Business defaults
BUSINESS_NAME=Flamex
EASYPAISA_NAME=Abdullah Saleem
EASYPAISA_ACCOUNT=03307072222

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10000

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
LOG_ERROR_FILE=logs/error.log
```

## NPM scripts
- `npm run dev` — start API with ts-node-dev (auto-reload)
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled server from `dist/`
- `npm run setup` — generate Prisma client, run migrations, seed data
- `npm run prisma:generate` — generate Prisma client into `src/generated/prisma`
- `npm run prisma:migrate` — create/apply dev migration
- `npm run prisma:deploy` — deploy migrations (CI/production)
- `npm run prisma:seed` — seed database via `prisma/seed.ts`
- `npm run prisma:reset` — reset DB and re-seed interactively
- `npm run prisma:studio` — open Prisma Studio UI
- `npm run docker:up` / `npm run docker:down` — compose up/down (see note below)
- `npm test` / `npm run test:watch` — Jest + Supertest suites
- `npm run lint` / `npm run format` — ESLint and Prettier over `src/**/*.ts`
- `npm run vercel-build` — build hook for Vercel (generates Prisma client first)

## Running with Docker
- Compose file lives at `src/docker-compose.yml`. Run from repo root with:
  - `docker-compose -f src/docker-compose.yml up -d`
  - `docker-compose -f src/docker-compose.yml down`
- Services: PostgreSQL (port 5432), Redis (port 6379), and the app (port 5001). The app container injects `DATABASE_URL` pointing at the Postgres service and mounts `logs/`.
- `Dockerfile` builds the Node image; adjust environment variables for production secrets.

## Database & Prisma workflow
- Schema: `prisma/schema.prisma` (PostgreSQL). Generated client output is `src/generated/prisma`.
- Typical flow after schema changes:
  1) `npm run prisma:generate`
  2) `npm run prisma:migrate` (or `prisma migrate dev --name <change>`)
  3) `npm run prisma:seed` (optional)
  4) `npm run prisma:deploy` in CI/prod
- Use `npm run prisma:studio` for browsing data.

## API surface (high level)
Routes are mounted under `/api` (`/health` is unauthenticated):
- `/auth` — login, register, refresh token, change password, logout, me
- `/orders` — create/update orders, items, statuses, delivery metadata
- `/users` — user CRUD, roles, status
- `/categories`, `/menu-items` — menu and item management
- `/customers` — customers, addresses, order history
- `/riders` — rider management
- `/expenses` — expense tracking
- `/business-info` — key/value business settings
- `/reports` — sales, items, delivery, expense summaries

## Directory quick tour
- `src/server/` — Express app + bootstrap
- `src/routes/` — route groupings under `/api`
- `src/controllers/` — request handling
- `src/services/` — business logic
- `src/repositories/` — Prisma data access
- `src/middlewares/` — auth, rate limiter, validation, error handler
- `src/validations/` — Zod schemas per resource
- `src/generated/prisma/` — Prisma client (generated)
- `prisma/` — schema and seed script
- `tests/` — Jest + Supertest suites

## Testing
- Ensure `.env` and database are ready, then run `npm test`.
- Supertest-based integration tests expect the API and DB to be reachable.

## Troubleshooting
- Prisma errors about missing client: run `npm run prisma:generate`.
- Database connection failures: verify `DATABASE_URL`, Postgres is running, and `sslmode` options if remote.
- CORS or cookie issues in browsers: align `CORS_ORIGIN`, `SESSION_SECRET`, and use HTTPS + `sameSite=none` in production.

