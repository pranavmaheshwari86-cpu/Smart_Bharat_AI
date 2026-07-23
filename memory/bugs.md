# Resolved Bugs & Defect Log

## [Resolved] Next.js SSR React Hydration Mismatch in Chat History & Navbar
- **Severity:** Medium
- **Date Discovered:** 2026-07-23
- **Date Resolved:** 2026-07-23
- **Affected Modules:** `src/lib/useChatHistory.ts`, `src/app/ai/page.tsx`, `src/app/assistant/page.tsx`, `src/components/Navbar.tsx`
- **Root Cause:** Direct un-hydrated reads of `localStorage` during initial server-side render pass created mismatches between server HTML and client DOM.
- **Fix:** Added `isMounted` state lifecycle check to defer local storage reads until after initial client mount pass.

## [Resolved] Unhandled Exception in HeroShowcase Carousel
- **Severity:** Low
- **Date Discovered:** 2026-07-23
- **Date Resolved:** 2026-07-23
- **Affected Modules:** `src/components/HeroShowcase.tsx`
- **Root Cause:** Index out-of-bounds evaluation (`showcaseItems[currentIndex]`) threw `TypeError: Cannot read properties of undefined (reading 'image')`.
- **Fix:** Implemented modulo bounds checking and defensive fallback (`const currentItem = showcaseItems[currentIndex % showcaseItems.length] || showcaseItems[0]`).

## [Resolved] AI Assistant Endpoint Route Mismatch
- **Severity:** High
- **Date Discovered:** 2026-07-23
- **Date Resolved:** 2026-07-23
- **Affected Modules:** `src/app/assistant/page.tsx`
- **Root Cause:** Chat interface was fetching legacy/missing `/api/chat` route instead of `/api/assistant`.
- **Fix:** Corrected fetch destination to `/api/assistant` powered by 10-Stage Enterprise AI Orchestration Engine.

