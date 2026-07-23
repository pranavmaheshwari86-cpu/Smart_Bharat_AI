# Changelog

*(Chronological history of features, improvements, refactors, performance/security fixes, and breaking changes)*

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
