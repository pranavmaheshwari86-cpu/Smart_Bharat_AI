# Backend Architecture (Express REST API)

- **Framework**: Node.js / Express with TypeScript
- **Port**: 5000
- **Pattern**: Controller-Service-Repository Pattern
- **Security**: Helmet, CORS (configured for `http://localhost:3000`), HTTP-Only SameSite Cookies
- **Key Layers**:
  - **Server & App**: `src/server.ts`, `src/app.ts`
  - **Controllers**: `src/controllers/auth.controller.ts`
  - **Services**: `src/services/auth.service.ts`
  - **Repositories**: `src/repositories/user.repository.ts`, `otp.repository.ts`, `session.repository.ts`, `password-reset.repository.ts`
