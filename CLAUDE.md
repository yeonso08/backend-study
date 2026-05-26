# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server with hot reload (ts-node-dev)
pnpm start      # run compiled JS (requires prior build)
```

No test runner or linter is configured yet.

## Environment Variables

Create a `.env` file at the project root with:

```
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
```

The app verifies the DB connection on startup and exits if it fails.

## Architecture

Layer order: `routes → controller → service → db/pool`

- **`src/app.ts`** — entry point; mounts `express.json()`, registers `/auth` routes, verifies DB connectivity before listening on port 4000.
- **`src/db/pool.ts`** — single shared `pg.Pool` instance, configured from env vars via `dotenv`.
- **`src/routes/auth.routes.ts`** — three endpoints: `POST /auth/signup`, `POST /auth/login`, `GET /auth/me` (protected).
- **`src/controllers/auth.controller.ts`** — thin handlers that destructure `req.body` and delegate to services; no business logic here.
- **`src/services/auth.service.ts`** — all business logic: bcrypt hashing (salt rounds = 10), raw SQL queries against the `users` table, JWT signing (`expiresIn: '1h'`). **Signup does not return a token**; only login does.
- **`src/middlewares/auth.middleware.ts`** — verifies `Authorization: Bearer <token>`, writes `req.user = { userId }` on success.
- **`src/types/express.d.ts`** — module augmentation that adds `user?: { userId: string }` to Express's `Request` interface. Required for `req.user` to type-check in middleware and route handlers.

## Key Conventions

- All DB access goes through the shared pool in `src/db/pool.ts`; use parameterized queries (`$1`, `$2`, …) — no string interpolation.
- `tsconfig.json` uses `"module": "NodeNext"` with `"moduleResolution": "NodeNext"`, so imports inside `src/` must include the `.js` extension when referencing compiled output (ts-node-dev handles this transparently at dev time).
