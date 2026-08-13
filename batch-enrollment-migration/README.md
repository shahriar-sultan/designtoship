# Batch Enrollment Migration Bundle

Exported from `lms-platform-frontend` — **Design & Ship with AI Batch 4** application form + MongoDB two-gate registration BFF.

## What's included

| Layer | Path in bundle |
|-------|----------------|
| BFF core | `lib/bff/two-gate-registration/` |
| Form client helpers | `lib/application/batchForm.ts` |
| Form UI | `components/application/` |
| UI primitives | `components/ui/label.tsx`, `textarea.tsx`, `select.tsx` |
| Shared utils | `lib/utils.ts`, `components/Loading.tsx` |
| Public form page | `app/(public)/apply/batch-4/page.tsx` |
| Verify email page | `app/(auth)/verify-email/page.tsx` |
| API routes | `app/api/applications/`, `app/api/admin/`, `app/api/auth/` |
| Admin UI | `app/(dashboard)/dashboard/admin/applications/page.tsx` |
| Seed script | `scripts/seed-bff-admin.ts` |
| Postman | `postman/Two-Gate-Registration-BFF.postman_collection.json` |

## Quick install (manual)

1. Unzip into your target Next.js project **root** (merge folders).
2. Copy `env.example.snippet` vars into `.env.local`.
3. Merge `package.json.snippet` dependencies and `seed:bff-admin` script.
4. Run `npm install` then `npm run seed:bff-admin`.
5. Open **`CURSOR_PROMPT.md`** in Cursor and paste the prompt into Agent mode.

## Target project requirements

- Next.js 14+ App Router
- TypeScript + `@/` path alias (see `tsconfig.json` paths)
- Tailwind + shadcn-style UI: `button`, `input`, `card`, `progress`
- Optional: dashboard layout for admin page (or use Postman only)

## API surface

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/applications/batch-4` | Form config (districts, pricing) |
| POST | `/api/applications/batch-4` | Submit application |
| GET/POST | `/api/auth/verify-email` | Email verification |
| POST | `/api/auth/bff-admin/login` | Admin JWT |
| GET | `/api/admin/applications` | List applications |
| PATCH | `/api/admin/users/:id/approve` | Approve applicant |

## Public pages

- `/apply/batch-4` — 5-step application wizard
- `/verify-email?token=...` — email verification

## MongoDB collections

- `bff_two_gate_users` — applicants + application payload
- `bff_admin_users` — BFF admin credentials

## After migration (LMS frontend)

Remove this bundle from LMS and unset `BFF_REGISTRATION_MONGODB_URI` so LMS auth proxies the main backend again. Point landing CTAs to the other project's `/apply/batch-4` URL.
