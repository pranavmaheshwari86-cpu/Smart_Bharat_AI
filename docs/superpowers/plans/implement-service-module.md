# Plan: Replace Mock Data with Service Module

## Goal
Replace direct `mockUserApplications` imports in `src/app/profile/page.tsx` with a service module wrapper, keeping all other mock data untouched.

## Files
| File | Action |
|---|---|
| `src/lib/services/applications.ts` | **Create** — service module wrapping `mockUserApplications` |
| `src/app/profile/page.tsx` | **Edit** — swap import and usage |
| `src/lib/data.ts` | **No change** — types stay here |

## Service Module Design
- Export `getUserApplications()` — returns `Promise<Application[]>` from `mockUserApplications`
- Export `getApplicationById(id: string)` — returns `Promise<Application | undefined>`
- Keep mock data import internal; consumer never imports from `data.ts` directly
- Async signature future-proofs real API swap

## Profile Page Changes
1. Remove: `import { mockUserApplications } from '@/lib/data';`
2. Add: `import { getUserApplications } from '@/lib/services/applications';`
3. In `ProfilePage` component: call `getUserApplications()` on mount (or display directly)
4. Ensure existing JSX renders unchanged

## Verification
- `npm run build` succeeds
- Profile page renders identically
