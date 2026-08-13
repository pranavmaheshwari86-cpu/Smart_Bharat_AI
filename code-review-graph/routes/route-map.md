# Route Topology & Access Map

## Frontend Routes (Next.js 15)
| Route Path | File Path | Type | Access Level |
|---|---|---|---|
| `/admin/ids` | `frontend/src/app/admin/ids/page.tsx` | Page | Protected |
| `/admin` | `frontend/src/app/admin/page.tsx` | Page | Protected |
| `/ai` | `frontend/src/app/ai/page.tsx` | Page | Public |
| `/assistant` | `frontend/src/app/assistant/page.tsx` | Page | Public |
| `/complaints` | `frontend/src/app/complaints/page.tsx` | Page | Public |
| `/credentials` | `frontend/src/app/credentials/page.tsx` | Page | Protected |
| `/forgot-password` | `frontend/src/app/forgot-password/page.tsx` | Page | Public |
| `/framework` | `frontend/src/app/framework/page.tsx` | Page | Public |
| `/id` | `frontend/src/app/id/page.tsx` | Page | Public |
| `/id/track` | `frontend/src/app/id/track/page.tsx` | Page | Public |
| `/id/[id]` | `frontend/src/app/id/[id]/page.tsx` | Page | Public |
| `/layout.tsx` | `frontend/src/app/layout.tsx` | Page | Public |
| `/login` | `frontend/src/app/login/page.tsx` | Page | Public |
| `/` | `frontend/src/app/page.tsx` | Page | Public |
| `/privacy` | `frontend/src/app/privacy/page.tsx` | Page | Public |
| `/profile` | `frontend/src/app/profile/page.tsx` | Page | Protected |
| `/reset-password` | `frontend/src/app/reset-password/page.tsx` | Page | Public |
| `/schemes` | `frontend/src/app/schemes/page.tsx` | Page | Public |
| `/schemes/track` | `frontend/src/app/schemes/track/page.tsx` | Page | Public |
| `/schemes/[id]` | `frontend/src/app/schemes/[id]/page.tsx` | Page | Public |
| `/security` | `frontend/src/app/security/page.tsx` | Page | Public |
| `/signup` | `frontend/src/app/signup/page.tsx` | Page | Public |
| `/standards` | `frontend/src/app/standards/page.tsx` | Page | Public |
| `/terms` | `frontend/src/app/terms/page.tsx` | Page | Public |
| `/track` | `frontend/src/app/track/page.tsx` | Page | Public |
| `/vault` | `frontend/src/app/vault/page.tsx` | Page | Protected |

## Backend API Routes (Express)
| Endpoint | Method | Controller | Access Level |
|---|---|---|---|
| `/api/auth/register` | POST | `AuthController.register` | Public |
| `/api/auth/login` | POST | `AuthController.login` | Public |
| `/api/auth/google` | POST | `AuthController.googleAuth` | Public |
| `/api/auth/otp/send` | POST | `AuthController.sendOtp` | Public |
| `/api/auth/otp/verify` | POST | `AuthController.verifyOtp` | Public |
| `/api/auth/password-reset/request` | POST | `AuthController.requestPasswordReset` | Public |
| `/api/auth/password-reset/confirm` | POST | `AuthController.confirmPasswordReset` | Public |
| `/api/auth/me` | GET | `AuthController.getCurrentUser` | Protected (JWT Cookie) |
| `/api/auth/logout` | POST | `AuthController.logout` | Protected (JWT Cookie) |
