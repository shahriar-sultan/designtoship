# File manifest (39+ files)

## Documentation
- README.md
- CURSOR_PROMPT.md
- env.example.snippet
- package.json.snippet
- FILE_MANIFEST.md

## lib/
- lib/utils.ts
- lib/application/batchForm.ts
- lib/bff/two-gate-registration/batchConfig.ts
- lib/bff/two-gate-registration/config.ts
- lib/bff/two-gate-registration/db.ts
- lib/bff/two-gate-registration/constants/districts.ts
- lib/bff/two-gate-registration/schemas/batchApplication.ts
- lib/bff/two-gate-registration/models/User.ts
- lib/bff/two-gate-registration/models/BffAdminUser.ts
- lib/bff/two-gate-registration/middleware/auth.ts
- lib/bff/two-gate-registration/routes/auth.ts
- lib/bff/two-gate-registration/routes/admin.ts
- lib/bff/two-gate-registration/routes/applications.ts
- lib/bff/two-gate-registration/routes/bffAdminLogin.ts
- lib/bff/two-gate-registration/utils/cryptoHelper.ts
- lib/bff/two-gate-registration/utils/emailService.ts

## components/
- components/Loading.tsx
- components/application/BatchApplicationWizard.tsx
- components/application/FormQuestionCard.tsx
- components/application/FormSectionHeader.tsx
- components/application/FormWizardNav.tsx
- components/application/RadioOptionGroup.tsx
- components/ui/label.tsx
- components/ui/textarea.tsx
- components/ui/select.tsx

## app/
- app/(public)/apply/batch-4/page.tsx
- app/(auth)/verify-email/page.tsx
- app/api/applications/batch-4/route.ts
- app/api/auth/verify-email/route.ts
- app/api/auth/verify-email/route.enrollment-only.ts
- app/api/auth/bff-admin/login/route.ts
- app/api/admin/applications/route.ts
- app/api/admin/users/[id]/approve/route.ts
- app/(dashboard)/dashboard/admin/applications/page.tsx

## scripts & postman
- scripts/seed-bff-admin.ts
- postman/Two-Gate-Registration-BFF.postman_collection.json

## Still required in target (not in bundle — use existing shadcn)
- components/ui/button.tsx
- components/ui/input.tsx
- components/ui/card.tsx
- components/ui/progress.tsx
