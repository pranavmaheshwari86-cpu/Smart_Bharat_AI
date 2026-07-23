# Architectural Action Items & Recommendations

1. **Keep Shared Contracts Synced**: Ensure any new DTO changes in `shared/` are published to both frontend and backend.
2. **Automate Graph Generation**: Run `npm run graph:all` as part of CI/CD pre-push checks.
3. **Database Migration Strategy**: When scaling backend storage, migrate `backend/src/database/db.ts` to PostgreSQL using Prisma/Drizzle.
