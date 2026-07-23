# Session Flow

- **Token Type**: JSON Web Token (JWT)
- **Transport**: HTTP-Only, SameSite Cookie
- **Verification**: `GET /api/auth/me` endpoint validates session token on client initial load.
- **Logout**: `POST /api/auth/logout` clears HTTP-Only cookie and revokes session record in backend.
