# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Autopipe?

A visual workflow automation platform (Next.js) — drag-and-drop canvas to build pipelines of triggers, actions, and AI steps, executed as background jobs.

## Commands

```bash
pnpm dev              # Next.js dev server only
pnpm dev:all          # Next.js + Inngest dev server together (via mprocs)
pnpm inngest:dev      # Inngest dev server only (needed to run/debug workflow executions locally)
pnpm build            # Production build
pnpm lint             # Biome check (lint + format check)
pnpm format           # Biome format --write
pnpm typecheck        # tsc --noEmit
```

Prisma (schema at `prisma/schema.prisma`, client generated to `src/generated/prisma`, not `node_modules`):
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

There is no test suite configured in this repo yet.

Linting/formatting is Biome, not ESLint/Prettier. Husky + lint-staged run `biome check --write` on staged `.ts/.tsx/.js/.jsx/.json` files on commit; commit messages must follow Conventional Commits (`commitlint.config.js`).

## Architecture

**Domain model** (`prisma/schema.prisma`): a `Workflow` has many `Node`s and `Connection`s. Each `Node` has a `NodeType` enum (`INITIAL`, `MANUAL_TRIGGER`, `HTTP_REQUEST`) plus freeform `position`/`data` JSON. `Connection` links a `fromNode`/`fromOutput` to a `toNode`/`toInput`, forming a DAG.

**Node type convention**: every node type is implemented as a self-contained folder under `src/features/triggers/components/<type>/` or `src/features/executions/components/<type>/`, with:
- `node.tsx` — the React Flow node UI (canvas representation)
- `dialog.tsx` — the node's configuration UI
- `executor.ts` — server-side execution logic, typed as `NodeExecutor` (`src/features/executions/types.ts`)

New node types must be registered in `src/features/executions/lib/executor-registry.ts` (`executorRegistry` maps `NodeType` → executor) to be runnable.

**Workflow execution** (`src/inngest/`): triggered via the `workflows/execute.workflow` Inngest event (`src/inngest/functions.ts`). The `executeWorkflow` function loads the workflow's nodes/connections, topologically sorts them (`src/inngest/utils.ts`), then runs each node's executor in order inside an Inngest `step.run`, threading a shared `context` object (accumulated output) from one node to the next.

**Editor canvas** (`src/features/editor/`): built on `@xyflow/react`. The live `ReactFlowInstance` is held in a Jotai atom (`store/atoms.ts`) so it can be read/imperatively controlled from outside the canvas component tree (e.g. toolbar buttons).

**API/data layer**: tRPC (`src/trpc/`) with a `superjson` transformer. Three procedure tiers in `src/trpc/init.ts`:
- `baseProcedure` — public
- `protectProcedure` — requires a `better-auth` session
- `premiumProcedure` — requires `protectProcedure` + an active Polar subscription (checked via `polarClient.customers.getStateExternal`)

Routers are colocated per feature under `src/features/<feature>/server/` and composed into `appRouter` in `src/trpc/routes/_app.ts`.

**Auth & billing**: `better-auth` with the Prisma adapter (`src/lib/auth.ts`), extended with the `@polar-sh/better-auth` plugin for checkout/portal/usage — Polar is the billing provider gating premium tRPC procedures.

**Prisma client**: import from `@/generated/prisma/client` (and `@/generated/prisma/enums` for enums), not `@prisma/client` — the client is generated into `src/generated/prisma` per `prisma/schema.prisma`'s custom `output`. Access the singleton via `src/lib/db.ts` (uses `PrismaPg` adapter over `DATABASE_URL`).

**i18n**: `next-intl`, locales `en`/`pt` (`src/i18n/routing.ts`), messages in `src/messages/<locale>`. Routes live under `src/app/[locale]/`; `src/proxy.ts` is the locale-detection middleware (matcher excludes `api`, `trpc`, `_next`, `_vercel`, and files with extensions).

**Env validation**: client-exposed env vars are validated with Zod in `src/env.ts` (`clientEnv`).
