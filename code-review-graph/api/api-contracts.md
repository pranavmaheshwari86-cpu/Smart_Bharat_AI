# API Endpoints & Service Contracts

## Auth Endpoints (`/api/auth`)

### `POST /api/auth/register`
- **Request Body**: `RegisterRequestDto` (`name`, `email`, `password`)
- **Response**: `AuthResponseDto` (`user`, `token`)

### `POST /api/auth/login`
- **Request Body**: `LoginRequestDto` (`email`, `password`)
- **Response**: `AuthResponseDto` (`user`, `token`) + HTTP-Only JWT Cookie

### `POST /api/auth/google`
- **Request Body**: `GoogleAuthDto` (`tokenId` / `credential`)
- **Response**: `AuthResponseDto`

### `POST /api/auth/otp/send` & `/verify`
- **Request Body**: Phone number and OTP verification payload
- **Response**: Verification status & JWT token

### `GET /api/auth/me`
- **Headers/Cookies**: JWT Cookie (`auth_token`)
- **Response**: Current `UserRecord`
