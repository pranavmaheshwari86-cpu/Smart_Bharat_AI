# Public vs Protected Routes

| Context | Route / Path | Classification | Requirement |
|---|---|---|---|
| Frontend | `/` | Public | None |
| Frontend | `/login`, `/signup` | Public | Guest Only |
| Frontend | `/profile`, `/vault`, `/credentials` | Protected | Authenticated User |
| Backend | `/api/auth/login`, `/register` | Public | Guest Only |
| Backend | `/api/auth/me`, `/logout` | Protected | HTTP-Only JWT Cookie |
