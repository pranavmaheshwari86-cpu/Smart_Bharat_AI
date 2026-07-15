---
theme: "light"
framework: "Next.js + Tailwind CSS"
primaryFont: "Geist, sans-serif"
---

# Design System

## Typography
- **Primary:** Geist (Sans)
- **Mono:** Geist Mono

## Color Palette (Monochromatic + Emerald Accent)
- **Body Background:** `slate-50` (`#f8fafc`)
- **Surface / Cards:** `white` / `slate-100` / `liquid-glass`
- **Text Primary:** `slate-900`
- **Text Secondary:** `slate-600`
- **Accent (Action):** `emerald-600` (`#059669`) / `accent-500`

## Components
### Layouts
- **Max Width:** `max-w-7xl` (for pages) / `max-w-3xl` (for navigation pill)
- **Hero:** Asymmetric, left-aligned, min-height 100dvh.

### Surfaces
- **Liquid Glass:** 
  - Utilities: `bg-white/70`, `backdrop-blur-xl`, `border border-white/50`, `shadow-[0_8px_32px_rgba(0,0,0,0.08)]`.

### Buttons
- **Primary Action:** Solid Emerald / Slate-900 with tactile active states (`active:scale-[0.97]`).
- **Secondary Action:** Ghost/Outline, hover `bg-slate-100/50`.

## Motion
- **Physics:** Spring-based physics only (`type: "spring", stiffness: 200, damping: 20` or `duration-300 transition-all`). No linear easing.
- **Hover:** Animate containers/shadows, never images.
