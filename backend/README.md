# Pixel Territory Backend

Production-oriented TypeScript backend for a real-time multiplayer tile claiming game.

## Stack

- Node.js, Express, TypeScript
- PostgreSQL/Neon with Drizzle ORM
- Redis Cloud with Socket.IO Redis Adapter
- Socket.IO
- Zod validation
- Pino logging
- OpenAPI docs at `/docs`

## Core Rules

- The app exposes one shared `30x30` grid containing `900` tiles.
- Tiles start with `owner_id = NULL`.
- A tile can be claimed exactly once.
- Concurrent capture attempts are resolved by PostgreSQL using a single atomic update:

```sql
UPDATE tiles
SET owner_id = $userId,
    claimed_at = NOW()
WHERE id = $tileId
  AND owner_id IS NULL
RETURNING *;
```

If this returns no rows, the socket receives `tile:capture_failed`.

## Setup

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

For local Docker services:

```bash
docker compose up --build
```

When using Neon and Redis Cloud, set `DATABASE_URL` and `REDIS_URL` in `.env`.

## REST API

- `POST /api/v1/users` creates a guest user with a UUID and random color.
- `GET /api/v1/grid` returns all 900 tiles ordered by id.
- `GET /api/v1/leaderboard` returns users sorted by claimed tile count.
- `GET /api/v1/stats` returns aggregate grid/user stats.
- `GET /api/v1/health` verifies the API and database are alive.

## Socket.IO

Client emits:

- `tile:capture` with `{ "userId": "uuid", "tileId": 1 }`

Server emits:

- `tile:updated` after a successful claim
- `tile:capture_failed` if validation fails or the tile is already claimed
- `presence:update` when socket presence changes
- `leaderboard:update` after successful claims

## Architecture

The project uses a controller -> service -> repository pattern:

- Controllers translate HTTP requests into service calls.
- Services hold application workflows.
- Repositories own database access.
- Socket gateway reuses the same services as REST code.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run typecheck
npm run db:generate
npm run db:migrate
npm run db:seed
```
