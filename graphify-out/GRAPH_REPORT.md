# Graph Report - Smart Bharat AI  (2026-07-17)

## Corpus Check
- 84 files · ~189,267 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 519 nodes · 532 edges · 49 communities (36 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f288157c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Project Documentation and Architecture
- data.ts
- cn
- dependencies
- AGENTS.md — Autonomous Engineering Operating Manual (v3)
- compilerOptions
- devDependencies
- components.json
- SMART BHARAT AI — COMPLETE DYNAMIC GOVERNMENT APPLICATION SYSTEM
- PROMPT 2A — GOVERNMENT IDs MODULE
- Tech Stack
- PageWrapper.tsx
- Todo & Prioritized Backlog
- Design System
- Coding Standards
- Product
- card.tsx
- How to Run
- Memory System
- Hero.tsx
- Current Status
- Deployment
- page.tsx
- Business Rules
- Changelog
- Project Overview: Smart Bharat AI
- page.tsx
- API Documentation
- README.md
- page.tsx
- Bugs
- Decisions & Open Questions
- page.tsx
- page.tsx
- page.tsx
- update-complaints.js
- button_audit.spec.ts
- eslint.config.mjs
- database.md
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `SMART BHARAT AI` - 29 edges
2. `SMART BHARAT AI — COMPLETE DYNAMIC GOVERNMENT APPLICATION SYSTEM` - 18 edges
3. `PROMPT 2A — GOVERNMENT IDs MODULE` - 17 edges
4. `compilerOptions` - 16 edges
5. `cn()` - 14 edges
6. `AGENTS.md — Autonomous Engineering Operating Manual (v3)` - 12 edges
7. `Tech Stack` - 12 edges
8. `Todo & Prioritized Backlog` - 10 edges
9. `2. Execution Protocol` - 8 edges
10. `3. Global Always-On Layer (the only unconditional entries)` - 8 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/layout.tsx → src/lib/utils.ts
- `BentoGrid()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/bento-grid.tsx → src/lib/utils.ts
- `BentoGridItem()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/bento-grid.tsx → src/lib/utils.ts
- `Spotlight()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/spotlight.tsx → src/lib/utils.ts
- `DynamicFormProps` --references--> `FormField`  [EXTRACTED]
  src/components/DynamicForm.tsx → src/lib/data.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Memory System Documentation Set** — memory_readme, memory_project_overview, memory_architecture, memory_tech_stack, memory_api, memory_database, memory_business_rules, memory_coding_standards, memory_current_status, memory_decisions, memory_changelog, memory_bugs, memory_deployment, memory_how_to_run, memory_todo [EXTRACTED 1.00]

## Communities (49 total, 13 thin omitted)

### Community 0 - "Project Documentation and Architecture"
Cohesion: 0.06
Nodes (30): ACCESSIBILITY & PERFORMANCE, ADMIN PANEL, AI SEARCH, APPLICATION FLOW, APPLICATION TRACKER, DATABASE DESIGN, DOCUMENT REUSE, DOCUMENT STORAGE (+22 more)

### Community 1 - "data.ts"
Cohesion: 0.05
Nodes (34): TabType, getIconForId(), IDPage(), containerVariants, itemVariants, SchemeDetailsClient(), Category, DocItem (+26 more)

### Community 2 - "cn"
Cohesion: 0.06
Nodes (28): geistMono, geistSans, metadata, RootLayout(), AIAssistant(), Message, PREDEFINED_QUESTIONS, AuthModal() (+20 more)

### Community 3 - "dependencies"
Cohesion: 0.05
Nodes (37): @base-ui/react, class-variance-authority, clsx, framer-motion, gsap, @gsap/react, lucide-react, next (+29 more)

### Community 4 - "AGENTS.md — Autonomous Engineering Operating Manual (v3)"
Cohesion: 0.06
Nodes (34): 0.1 v3 Addendum — Round 2 Additions (new skills, `sequential-thinking` MCP, `caveman` family), 0. Audit Summary — What Changed From v1 and Why, 10. Strict System Rules, 1. Design Principles, 2. Execution Protocol, 3. Global Always-On Layer (the only unconditional entries), 4. Stage Pipeline, 5. Full Capability Roster (+26 more)

### Community 5 - "compilerOptions"
Cohesion: 0.06
Nodes (30): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+22 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, @playwright/test, tailwindcss, @tailwindcss/postcss (+19 more)

### Community 7 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 8 - "SMART BHARAT AI — COMPLETE DYNAMIC GOVERNMENT APPLICATION SYSTEM"
Cohesion: 0.11
Nodes (18): 10. APPLICATION WORKFLOW, 11. AI INTELLIGENCE LAYER, 12. SEARCH & NOTIFICATIONS, 13. UX & ACCESSIBILITY, 14. ADMIN & SECURITY, 15. ARCHITECTURE & PRODUCTION QUALITY, 1. DYNAMIC GOVERNMENT ID PAGES, 2. DYNAMIC APPLICATION FORM (+10 more)

### Community 9 - "PROMPT 2A — GOVERNMENT IDs MODULE"
Cohesion: 0.11
Nodes (17): AADHAAR CARD, AI & ACCESSIBILITY, APPLICATION WIZARD, Architecture + Aadhaar + PAN + Passport, DEDICATED SERVICE PAGE, DOCUMENT UPLOAD & REUSE, FINAL REQUIREMENT, MODULE OVERVIEW (+9 more)

### Community 10 - "Tech Stack"
Cohesion: 0.15
Nodes (12): Authentication, Backend, Build & Deployment Tools, Database & ORM, Frontend, Infrastructure & Hosting, Languages, Libraries & Frameworks (+4 more)

### Community 12 - "Todo & Prioritized Backlog"
Cohesion: 0.18
Nodes (10): Phase 1: Navigation, Authentication, Dashboard, Phase 2: Schemes, Phase 3: Government IDs, Phase 4: Complaints, Phase 5: My Applications & Insights, Phase 6: My Credentials, Phase 7: AI Assistant, Phase 8: Global Search & Notifications (+2 more)

### Community 13 - "Design System"
Cohesion: 0.22
Nodes (8): Buttons, Color Palette (Monochromatic + Emerald Accent), Components, Design System, Layouts, Motion, Surfaces, Typography

### Community 14 - "Coding Standards"
Cohesion: 0.22
Nodes (8): Backend Standards & API Conventions, Coding Standards, Error Handling & Logging, Folder Conventions, Git Conventions & Commit Message Format, Naming Conventions, Security & Testing, TypeScript & React Standards

### Community 15 - "Product"
Cohesion: 0.22
Nodes (8): Accessibility & Inclusion, Anti-references, Brand Personality, Design Principles, Product, Product Purpose, Register, Users

### Community 16 - "card.tsx"
Cohesion: 0.33
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 17 - "How to Run"
Cohesion: 0.25
Nodes (7): Build, How to Run, Installation & Dependencies, Local Development, Production Startup, Requirements, Test, Lint & Debug

### Community 18 - "Memory System"
Cohesion: 0.25
Nodes (7): File Responsibilities, How AI Agents Should Use It, How Developers Should Use It, Maintenance Guidelines, Memory System, Purpose, Update Rules

### Community 19 - "Hero.tsx"
Cohesion: 0.32
Nodes (4): Hero(), Spline, SplineScene(), SplineSceneProps

### Community 20 - "Current Status"
Cohesion: 0.29
Nodes (6): Blocked Tasks & Known Issues, Completed Work, Current Priorities, Current Status, Next Milestones, Work in Progress

### Community 21 - "Deployment"
Cohesion: 0.29
Nodes (6): CI/CD & Hosting, Configuration, Deployment, Environments, Infrastructure, Processes

### Community 22 - "page.tsx"
Cohesion: 0.33
Nodes (4): Message, InteractiveRobotSpline(), InteractiveRobotSplineProps, Spline

### Community 23 - "Business Rules"
Cohesion: 0.33
Nodes (5): Application & Complaint Lifecycle, Authentication Policy, Business Rules, Functional Requirements, Roles & Permissions (v1)

### Community 24 - "Changelog"
Cohesion: 0.33
Nodes (5): 2026-07-15, 2026-07-16, 2026-07-16 (Latest), 2026-07-16 (Update), Changelog

### Community 25 - "Project Overview: Smart Bharat AI"
Cohesion: 0.33
Nodes (5): Out of Scope (v1), Problem Statement, Project Overview: Smart Bharat AI, Purpose, Success Metrics

### Community 26 - "page.tsx"
Cohesion: 0.40
Nodes (3): SUBCATEGORIES, HeroShowcase(), showcaseItems

### Community 27 - "API Documentation"
Cohesion: 0.50
Nodes (3): API Documentation, Endpoints, `GET /example`

### Community 28 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **303 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `card.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _303 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Documentation and Architecture` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `data.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05021173623714459 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.06448202959830866 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._