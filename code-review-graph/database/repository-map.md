# Database Models & Repository Map

## Repositories
- **UserRepository** (`backend/src/repositories/user.repository.ts`): Database operations for `UserRecord`
- **SessionRepository** (`backend/src/repositories/session.repository.ts`): Active JWT session persistence
- **OtpRepository** (`backend/src/repositories/otp.repository.ts`): Phone OTP verification state
- **PasswordResetRepository** (`backend/src/repositories/password-reset.repository.ts`): Password reset tokens

## Storage Engine
- Persistent JSON / SQLite File Store configured in `backend/src/database/db.ts`
