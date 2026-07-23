# Authentication Flow

1. User submits login/signup on Frontend (`frontend/src/app/login` or `signup`).
2. Client calls `auth.api.ts` -> REST API POST request to `http://localhost:5000/api/auth/*`.
3. `AuthController` handles request and invokes `AuthService`.
4. `AuthService` validates credentials using shared rules from `@smart-bharat/shared`.
5. On success, `AuthService` signs JWT token and stores session in `SessionRepository`.
6. Express sets HTTP-Only, SameSite cookie (`auth_token`) on response.
7. Frontend `AuthContext` updates state and redirects user.
