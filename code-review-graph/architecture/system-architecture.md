# Smart Bharat AI System Architecture

## Overview
Smart Bharat AI is structured as a production-ready TypeScript Monorepo featuring decoupled frontend, backend, and shared domain validation layers.

```mermaid
graph TD
  User["Browser / Client"] --> Frontend["frontend (Next.js 15 App Router :3000)"]
  Frontend --> CentralAPIClient["frontend/src/lib/api/client.ts"]
  CentralAPIClient -->|REST API + HTTP-Only JWT| Backend["backend (Express REST Server :5000)"]
  Backend --> Controllers["backend/src/controllers"]
  Controllers --> Services["backend/src/services"]
  Services --> Repositories["backend/src/repositories"]
  Repositories --> Database["backend/src/database (Persistent DB)"]

  Frontend -.-> Shared["shared (@smart-bharat/shared)"]
  Backend -.-> Shared
```

## Monorepo Layers
- **frontend/**: Next.js 15 App Router user interface for citizen portal, identity verification, AI scheme recommendations, complaints, and digital credential vault.
- **backend/**: Express.js REST API implementing Controller-Service-Repository architecture with JWT authentication, OTP verification, and user management.
- **shared/**: `@smart-bharat/shared` TypeScript package providing shared domain types, DTOs, and client/server password validation logic.
- **data/**: Curated dataset and JSON schemas for government schemes, ID rules, and AI assistant prompts.
- **e2e/**: End-to-end testing suite validating citizen workflows.
