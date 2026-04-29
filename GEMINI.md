# ReadCeipt Project Instructions

This file contains foundational mandates for the ReadCeipt project. All contributors (human and AI) must adhere to these standards.

## Architecture

OCR-powered mobile app to capture, parse, and organise receipt data. Two independent packages (no shared workspace root):

- **api/** — Cloudflare Worker (Hono) that receives base64 images, extracts text via Google Cloud Vision, then parses structured receipt data via Gemini (`@ai-sdk/google`). Entry: `src/index.ts`. Exposes `POST /api/scan` with API key auth (KV namespace `API_KEYS`) and per-key rate limiting (10 req/min).
- **client/** — Expo app (React Native + TypeScript) with expo-router file-based routing. Local SQLite via Drizzle ORM + `expo-sqlite`. State management via Zustand. Styled with NativeWind (Tailwind). Web build deploys to Cloudflare Pages as a marketing landing page with phone emulator wrapper.
- **prototyping/** — Scratch Python scripts for AI vision experiments. Not part of the app.

## Developer Commands

| Task | Command |
|---|---|
| API dev server | `cd api && pnpm dev` |
| Client dev | `cd client && pnpm start` |
| API deploy | `cd api && pnpm deploy` |
| Format (either package) | `cd <dir> && pnpm format` |
| Client lint | `cd client && pnpm lint` |
| Generate Drizzle migration | `cd client && pnpm drizzle-kit generate` |
| Regenerate CF Worker types | `cd api && pnpm cf-typegen` |

No test framework is configured. API has a manual smoke test at `api/test/test.js`.

## Environment & Configuration

- **API secrets**: stored in `api/.dev.vars` (gitignored). Requires `GEMINI_API_KEY` and `CLOUD_VISION_KEY`.
- **Client path alias**: `@/*` maps to client root (see `client/tsconfig.json`).
- **pnpm quirk**: `client/pnpm-workspace.yaml` sets `nodeLinker: hoisted` — do not change this without understanding why.
- **API bindings**: `API_KEYS` (KV) and `SCAN_LIMITER` (Rate Limit) defined in `api/wrangler.jsonc`.

## Code Conventions

- **No emojis** anywhere in code, comments, or docs.
- **TypeScript strict** in both packages. Avoid `any` and type-casting.
- **Self-documenting code** — minimal comments, only for non-obvious logic.
- **Client styling**: NativeWind (Tailwind classes) only. No inline styles unless dynamic.
- **Component architecture**: functional components, reusable UI primitives in `client/components/ui/`, business logic in custom hooks (`client/hooks/`).
- **Cross-platform**: use `Platform.OS` or `.web.tsx`/`.native.tsx` extensions when native and web logic diverge.

## Database

- Schema: `client/db/schema.ts` — two tables: `receipts` and `receipt_items` (cascade delete).
- After any schema change, run `pnpm drizzle-kit generate` in `/client`.
- DB driver: `expo-sqlite` via Drizzle with `expo` driver mode.

## Notable Dependencies

- API: Hono, Vercel AI SDK (`ai`, `@ai-sdk/google`), Zod v4
- Client: expo-router, Drizzle ORM, Zustand, NativeWind, date-fns, ngrok (local tunneling)
