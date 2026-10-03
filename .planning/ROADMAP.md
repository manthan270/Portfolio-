# ROADMAP — Portfolio Audit & Fix

## Overview
Four phases moving from critical bugs → UX polish → content expansion → performance hardening.

---

## Phase 1 — Critical Bug Fixes & Broken Assets ✅ COMPLETED
**Goal:** Make the portfolio fully functional with no broken references or runtime errors.

### Tasks
- [x] **[BUG] Missing video file** — Removed dead `/videos/heymain.mp4` reference from `portfolioData.jsx` and cleaned up `HeroImage.jsx`.
- [x] **[BUG] Undefined CSS variable** — Defined `--primary-rgb` in both `:root` (light) and `.dark` blocks in `index.css`.
- [x] **[BUG] `about-container` class has no CSS definition** — Replaced with `p-6` Tailwind class, removed `about-text` dangling classes.
- [x] **[BUG] `HireLite` project image mismatch** — Renamed `OrdersOgImage.webp` → `hirelite.webp` (+ variants), updated `portfolioData.jsx`.
- [x] **[BUG] Contact section email** — Flagged for user review — currently `anilgadegone@gmail.com`.
- [x] **[BUG] `Projects` page shows only Web Projects** — Added `dataProjects` filter and a second `<ProjectSection>` for Data Projects.
- [x] **[BUG] Playground poster images were missing** — Updated the gallery to use the existing 800px WebP files.

---

## Phase 2 — SEO, Accessibility & Meta Improvements ✅ COMPLETED
**Goal:** Improve discoverability, social sharing, and screen-reader support.

### Tasks
- [x] **[SEO] Missing `og:image` / `twitter:image`** — Added Open Graph and Twitter image tags to `index.html`.
- [x] **[SEO] Page `<title>` is generic** — Updated title to `Manthan Gadegone — UI/UX Designer & Frontend Developer`.
- [x] **[SEO] Missing `<meta name="keywords">`** — Added relevant keywords.
- [x] **[A11Y] `AboutMe.jsx` missing padding** — Handled in Phase 1 (applied `p-8 md:p-10`).
- [x] **[A11Y] Missing `aria-label` on social links** — Added `aria-label` to Hero social icons.
- [x] **[A11Y] Modal keyboard and focus handling** — Added focus trapping, dialog labels, Escape-to-close, and scroll restoration where needed.
- [x] **[A11Y] `vercel.json` SPA routing** — Verified correct `vercel.json` exists for Vercel SPA routing.

---

## Phase 3 — Content Expansion & UX Polish ✨
**Goal:** Enrich content and smooth rough UX edges.

### Tasks
- [ ] **[CONTENT] Confirm Campus System project details** — A concept image and in-development modal exist, but the portfolio has no verified project description or live destination. Publish it after confirming its status and details.
- [x] **[UX] `AboutMe.jsx` padding** — The card already uses responsive internal padding.
- [x] **[UX] Suspense fallback polish** — Added accessible skeleton states for route and section loading.
- [x] **[UX] Hero Dithering shader colors** — Adapted colors to the active theme and disabled the effect for reduced-motion preferences.
- [x] **[UX] `comingSoon` modal integration** — Verified its project-card path and added dialog accessibility. No current project entry uses it.

---

## Phase 4 — Performance & Bundle Optimization 🚀
**Goal:** Minimize bundle, improve LCP, and ensure production-readiness.

### Tasks
- [x] **[PERF] `global_restaurant_analysis.png` is 535 KB** — Added WebP and responsive variants; the source PNG is retained.
- [x] **[PERF] Multiple Google Font requests** — Consolidated the used families into one request and removed unused Geist Mono.
- [ ] **[PERF] `hero-video.webm` is 1.8 MB** — Change `preload="metadata"` to `preload="none"` and load on demand.
- [x] **[PERF] Remove unused font families** — Removed Geist Mono; Bebas Neue, Sora, and JetBrains Mono remain because the coming-soon modal uses them.

---

## Status Legend
- `[ ]` Not started
- `[/]` In progress  
- `[x]` Completed
