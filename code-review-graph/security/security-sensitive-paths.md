# Security Sensitive Paths

- **Backend Controls**:
  - `backend/src/app.ts`: Helmet security headers & CORS policy
  - `backend/src/services/auth.service.ts`: Bcrypt password hashing & JWT signing
  - `backend/src/controllers/auth.controller.ts`: Auth request sanitization
- **Frontend Controls**:
  - `frontend/src/lib/api/client.ts`: Credentials inclusion (`withCredentials: true`)
  - `frontend/src/context/AuthContext.tsx`: Auth route guard & session lifecycle
