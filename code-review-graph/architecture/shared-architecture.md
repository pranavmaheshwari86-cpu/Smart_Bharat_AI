# Shared Package Architecture (@smart-bharat/shared)

- **Location**: `shared/`
- **Exports**: DTOs, User Interfaces, Password Validation Logic
- **Structure**:
  - `src/types/auth.ts`: UserRecord, SessionRecord, OtpRecord, PasswordResetRecord DTOs
  - `src/validations/password.ts`: Common password policy rules shared across client and server
