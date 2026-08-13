# Cursor Agent Prompt — Batch Enrollment Integration

Copy everything below the line into Cursor **Agent mode** after unzipping this bundle into your target project root.

---

## PROMPT (copy from here)

You are integrating the **Batch 4 enrollment feature** exported from `lms-platform-frontend`. The bundle is already unzipped at the project root with this structure:

- `lib/bff/two-gate-registration/` — MongoDB BFF (two-gate: email verify → admin approve)
- `lib/application/batchForm.ts` — client form state, options, session draft
- `components/application/` — 5-step wizard UI
- `app/(public)/apply/batch-4/` — public application page
- `app/api/applications/batch-4/` — GET config + POST submit
- `app/api/auth/verify-email/`, `bff-admin/login/` — auth BFF routes
- `app/api/admin/applications/`, `admin/users/[id]/approve/` — admin routes
- `app/(auth)/verify-email/` — verification page
- `app/(dashboard)/dashboard/admin/applications/` — admin review UI (optional)
- `scripts/seed-bff-admin.ts` — seed BFF admin user
- `postman/Two-Gate-Registration-BFF.postman_collection.json`

### Your job

Integrate this feature completely into **this** Next.js project. Do not use mock data. All API calls go through `/api/*` BFF routes in this app.

### Step 1 — Dependencies

Merge `package.json.snippet` into `package.json`:
- Add deps: `mongoose`, `jsonwebtoken`, `nodemailer`, `bcryptjs`, `zod`, `clsx`, `tailwind-merge`, `class-variance-authority`
- Add devDeps: `tsx`, `dotenv`, `@types/bcryptjs`, `@types/jsonwebtoken`, `@types/nodemailer`
- Add script: `"seed:bff-admin": "tsx scripts/seed-bff-admin.ts"`
- Run `npm install`

Ensure these shadcn UI components exist (create from bundle or via shadcn if missing):
- `components/ui/button`, `input`, `card`, `progress`, `label`, `textarea`, `select`
- `lib/utils.ts` with `cn()` (included in bundle)
- `components/Loading.tsx` (included in bundle)

### Step 2 — Environment

Merge `env.example.snippet` into `.env.local`. Required:
- `BFF_REGISTRATION_MONGODB_URI`
- `BFF_REGISTRATION_JWT_SECRET` (or `JWT_SECRET` / `NEXTAUTH_SECRET`)
- `NEXT_PUBLIC_APP_URL`
- Batch vars: `BFF_BATCH_BKASH_NUMBER`, `BFF_BATCH_EARLY_BIRD_DEADLINE`, amounts

### Step 3 — Route integration

1. **`/apply/batch-4`** must be publicly accessible (no auth middleware block).
2. **`/verify-email`** must handle `?token=` and POST to `/api/auth/verify-email`.
3. If this project has **no LMS backend proxy**, simplify `app/api/auth/verify-email/route.ts` to **two-gate only** (remove `fetchBackend` fallback). Same if a dual-mode register route exists — batch flow uses `POST /api/applications/batch-4`, not `/api/auth/register`.
4. Hide navbar on `/apply/*` and auth pages if a conditional navbar exists (pattern from LMS: `pathname.startsWith("/apply/")`).
5. Wire landing CTAs to `/apply/batch-4` (constant e.g. `BATCH_4_APPLY_URL`).

### Step 4 — Admin (choose one)

**Option A — Dashboard page (included):**
- Ensure `(dashboard)` layout exists or move admin page to a simpler route like `/admin/applications`.
- Admin uses **separate BFF JWT** via `POST /api/auth/bff-admin/login` (not NextAuth). Page at `app/(dashboard)/dashboard/admin/applications/page.tsx` stores JWT in React state only (never localStorage).

**Option B — Postman only:**
- Skip admin UI; use Postman collection: login → list applications → PATCH approve.

### Step 5 — Seed & verify

```bash
npm run seed:bff-admin
npm run dev
```

Test flow:
1. GET `/api/applications/batch-4` → 200 with districts/pricing
2. Complete `/apply/batch-4` → 201
3. Verify email (token from console if no SMTP)
4. GET `/api/admin/applications?status=PENDING_ADMIN` with Bearer JWT
5. PATCH `/api/admin/users/:id/approve`

### Constraints (must follow)

- **No mock data** — districts/pricing from BFF config API
- **BFF-only** — components fetch `/api/*` only, never direct backend URLs
- **Security** — generic error messages; no secrets in client; BFF admin JWT in memory only on admin page
- **Theme** — use existing design tokens; do not invent new colors unless needed for form layout (card-based wizard like Google Forms)
- **Route protection** — if middleware exists, allow public: `/`, `/apply/batch-4`, `/verify-email`, `/api/applications/batch-4`, `/api/auth/verify-email`

### Step 6 — Fix imports & paths

- All imports use `@/` alias — align `tsconfig.json` paths if different
- Fix any broken imports after merge (dashboard breadcrumb, session hooks, etc.)
- Run `npx tsc --noEmit` and fix type errors

### Deliverables

When done, report:
1. Files added/modified
2. Env vars the user must set
3. URLs to test
4. Any deviations (e.g. admin page moved, verify route simplified)

## END PROMPT

---

## Optional: shorter prompt

If the project is a fresh Next.js app with shadcn already set up:

> Unzip `batch-enrollment-migration` into project root. Merge package.json.snippet and env.example.snippet. Run npm install && npm run seed:bff-admin. Integrate all bundled files, ensure `/apply/batch-4` and verify-email work, simplify verify-email route to two-gate-only if no LMS backend. Wire hero CTA to `/apply/batch-4`. Run tsc and fix imports. Follow no-mock-data and BFF-only rules.
