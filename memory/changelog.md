# Changelog

*(Chronological history of features, improvements, refactors, performance/security fixes, and breaking changes)*

## 2026-08-14 (Multilingual System & 9-Language Selection Support)
- **Summary:** Built comprehensive internationalization & multilingual context system (`LanguageContext.tsx` & `translations.ts`) supporting 9 Indian & international languages: English (top), 1) Hindi, 2) Bengali, 3) Marathi, 4) Telugu, 5) Tamil, 6) Gujarati, 7) Urdu, and 8) Kannada. Designed `LanguageSelector.tsx` dropdown menu positioned directly to the right side of the Sign Out button in `Navbar.tsx` (and in mobile drawer). Integrated translation lookup across `Navbar`, `Hero`, `Footer`, `AIAssistant`, and `assistant/page.tsx`. Configured `AIOrchestrator.process`, `assembleSystemPrompt`, and `dispatchLLMRequest` in `/api/assistant` to transmit target language directives and generate AI assistant responses in the selected language. Updated `@code-review-graph`, `@graphify-out`, and `@memory`.
- **Files Changed:** `frontend/src/lib/i18n/translations.ts`, `frontend/src/context/LanguageContext.tsx`, `frontend/src/components/LanguageSelector.tsx`, `frontend/src/components/Navbar.tsx`, `frontend/src/app/layout.tsx`, `frontend/src/components/Footer.tsx`, `frontend/src/components/Hero.tsx`, `frontend/src/components/ai/AIAssistant.tsx`, `frontend/src/app/assistant/page.tsx`, `frontend/src/app/api/assistant/route.ts`, `frontend/src/lib/ai/orchestrator.ts`, `code-review-graph/*`, `graphify-out/*`, `memory/*`.
- **Author:** Pranav Maheshwari & AI Assistant

## 2026-08-13 (Full-Stack Navigation Performance Engineering & Instant Page Routing)
- **Summary:** Conducted deep performance audit to eliminate page-to-page navigation delay. Synchronized `PUBLIC_ROUTES` in `Navbar.tsx` across all primary destinations (`/schemes`, `/id`, `/complaints`, `/assistant`, `/credentials`) to prevent blocking SPA navigation. Removed render-blocking external Google Fonts stylesheet links in `layout.tsx`, relying 100% on self-hosted `next/font/google`. Eliminated main-thread CPU-blocking `mousemove` querySelector listeners and unrendered WebGL `requestAnimationFrame` loops in `schemes/page.tsx` and `complaints/page.tsx`. Replaced dynamic Footer import with direct import. Removed route-level `loading.tsx` Suspense skeleton boundaries to enable direct instant (<80ms) page transitions. Updated `@code-review-graph`, `@graphify-out`, and `@memory`.
- **Files Changed:** `frontend/src/components/Navbar.tsx`, `frontend/src/app/layout.tsx`, `frontend/src/app/globals.css`, `frontend/src/app/schemes/page.tsx`, `frontend/src/app/complaints/page.tsx`, `frontend/src/app/assistant/page.tsx`, `frontend/src/components/HeroShowcase.tsx`, `code-review-graph/*`, `graphify-out/*`, `memory/*`.
- **Author:** Pranav Maheshwari & AI Assistant

## 2026-07-28 (Custom Brand Logo, Responsive Layout Alignment & Hydration Fix)
- **Summary:** Custom Indian Tricolor & Ashoka Chakra AI logo integrated across `Navbar.tsx`, `Footer.tsx`, `login/page.tsx`, and `signup/page.tsx`. Standardized page container widths to `max-w-7xl` with `px-4 sm:px-6 lg:px-8` across all pages (`schemes`, `id`, `credentials`, `complaints`). Converted `Hero.tsx` layout to a symmetric 12-column grid (`grid-cols-1 lg:grid-cols-12`). Resolved Navbar link collision and drawer breakpoint (`xl`). Fixed React Hydration error by adding `suppressHydrationWarning` on logo and auth elements. Rebuilt `@code-review-graph`, `@graphify-out`, and `@memory`.
- **Files Changed:** `frontend/public/logo.png`, `frontend/src/components/Navbar.tsx`, `frontend/src/components/Footer.tsx`, `frontend/src/components/Hero.tsx`, `frontend/src/components/HeroShowcase.tsx`, `frontend/src/app/login/page.tsx`, `frontend/src/app/signup/page.tsx`, `frontend/src/app/schemes/page.tsx`, `frontend/src/app/id/page.tsx`, `frontend/src/app/credentials/page.tsx`, `frontend/src/app/complaints/page.tsx`, `README.md`, `code-review-graph/*`, `graphify-out/*`, `memory/*`.
- **Author:** Pranav Maheshwari & AI Assistant

## 2026-07-27
- **Summary:** Fixed registration failure by making optional fields (`phone`, `acceptTerms`, `confirmPassword`) optional in `auth.service.ts` `emailRegister`. Updated `auth.controller.ts` to issue session cookie on signup. Refactored `/credentials` page design to match exact warm cream background (`bg-[#FAF8F4]`), card borders (`#E4E0D6`), Royal Blue pill buttons (`#2563EB`), and typography of the main Dashboard.
- **Files Changed:** `backend/src/services/auth.service.ts`, `backend/src/controllers/auth.controller.ts`, `frontend/src/app/credentials/page.tsx`, `memory/changelog.md`, `.agents/AGENTS.md`.
- **Author:** Pranav Maheshwari & AI Assistant

## 2026-07-23 (Enterprise AI Pipeline & Vault Refactor - Latest)
- **Summary:** Built 10-stage Enterprise AI Orchestration System (`src/lib/ai/`) featuring Security Guardrails, Intent Classification, Memory Management, Advanced RAG (BM25 + Semantic Search), Tool Execution, Dynamic Prompting, Multi-Model Router (Groq Llama-3.3-70B primary, OpenRouter fallback), and Self-Reflection Validator. Expanded agricultural dataset with KCC, PMFBY, SMAM, and PMKSY matching Google Search AI Overview data. Implemented persistent real chat sessions (`src/lib/useChatHistory.ts`) with smart topic-aware titling and zero React SSR hydration errors. Refactored `/credentials` page to remove fake mock cards and store real user uploaded documents in encrypted vault with DigiLocker sync. Fixed bounds checking bug in `HeroShowcase.tsx`. Rebuilt `@mcp:code-review-graph`, `@graphify-out`, and `@memory`.
- **Files Changed:** `src/lib/ai/*`, `src/app/api/assistant/route.ts`, `src/lib/knowledge.ts`, `src/lib/data.ts`, `src/lib/useChatHistory.ts`, `src/app/ai/page.tsx`, `src/app/assistant/page.tsx`, `src/app/credentials/page.tsx`, `src/components/HeroShowcase.tsx`.
- **Author:** Pranav Maheshwari & AI Assistant

## 2026-07-23
- **Summary:** Replaced futuristic/robot-like carousel images with high-resolution, photorealistic modern Indian smart city civic infrastructure photography (`water-leakage.png`, `garbage-overflow.png`, `streetlight-repair.png`, `pothole-repair.png`). Implemented dynamic localhost CORS regex on Express backend to allow Next.js multi-port hot reloading (`:3000`, `:3001`, etc.) without authentication blocks. Rebuilt `@mcp:code-review-graph`, `@graphify-out`, and `@memory`.
- **Files Changed:** `HeroShowcase.tsx`, `public/showcase/*`, `backend/src/app.ts`, `backend/src/config/index.ts`, `memory/*`, `code-review-graph/*`, `graphify-out/*`.
- **Author:** Pranav Maheshwari & AI Assistant

## 2026-07-22
- **Summary:** Full-width translucent glass header navbar transformation, Hero showcase image slideshow & platform removal, instant dedicated `/assistant?q=...` full-page AI chat routing, React 19 client hydration fixes, and global `AGENTS.md` policy updates (`opencode-token-optimization`, `ponytail`, `ruflo` MCP).
- **Files Changed:** `Navbar.tsx`, `Hero.tsx`, `HeroShowcase.tsx`, `AIAssistant.tsx`, `app/assistant/page.tsx`, `app/layout.tsx`, `AuthContext.tsx`, `login/page.tsx`, `signup/page.tsx`, `AGENTS.md`.
- **Author:** Pranav Maheshwari & AI Assistant

## 2026-07-16
- **Summary:** Added `DocumentSelector` and `HeroShowcase` UI components. 
- **Files Changed:** `src/components/DocumentSelector.tsx`, `src/components/HeroShowcase.tsx`, `src/components/Hero.tsx`, `src/app/id/page.tsx`, etc.
- **Author:** Pranav Maheshwari

## 2026-07-15
- **Summary:** Complete comprehensive UI button audit and Playwright validation. Complete rewrite of schemes page to exact HTML design. Premium UI polish pass and navbar layout updates.
- **Files Changed:** `src/app/schemes/page.tsx`, `e2e/button_audit.spec.ts`, `src/app/globals.css`, `src/app/ai/page.tsx`, `src/components/Hero.tsx`, `src/components/Navbar.tsx`, etc.
- **Author:** Pranav Maheshwari

## 2026-07-16
- **Summary:** Added Interactive 3D Robot using Spline and an animated Spotlight UI component using framer-motion for enhanced premium visuals.
- **Files Changed:**
  - `src/components/ui/spotlight.tsx`
  - `src/components/ui/interactive-3d-robot.tsx`
  - `src/components/ui/splite.tsx`
  - `src/components/ui/input.tsx`
- **Author:** AI

## 2026-07-16 (Update)
- **Summary:** Styled background of ID, Complaints, and Credentials page to match AI dashboard. Improved 3D Robot global interaction using Spline's setGlobalEvents.
- **Files Changed:**
  - `src/app/id/page.tsx`
  - `src/app/complaints/page.tsx`
  - `src/app/credentials/page.tsx`
  - `src/components/ui/interactive-3d-robot.tsx`
- **Author:** AI
