# PROJECT: Manthan Gadegone Portfolio

## Project Type
Existing personal portfolio — personalization, stability, performance, and release preparation.

## Current Identity and Content
- **Name:** Manthan Gadegone
- **Role:** Web Developer / Data Analyst
- **Education:** B.Tech in Electronics & Telecommunication Engineering; St. Vincent Pallotti College of Engineering, Class of 2025
- **Live site:** https://manthanone.vercel.app/
- **Main content source:** `src/data/portfolioData.jsx`
- **Playground content source:** `src/data/playgroundData.js`

## Stack
- **Framework:** React 18, Vite 7, React Router 7
- **Styling:** Tailwind CSS 4 with `@tailwindcss/vite`
- **Animation:** Motion for React
- **Visual effects and icons:** Paper Design shaders and Lucide React
- **Monitoring:** Vercel Analytics and Speed Insights
- **Deploy target:** Vercel
- **Node requirement:** Node 20.19+ or 22.12+

## Application Structure
- `/` — one-page portfolio; sections appear in this order: Hero, About, Education, Projects, Experience, Skills, Playground preview, Certificates, Contact.
- `/projects` — project listing.
- `/project/:slug` — project detail.
- `/playground` — visual experiments and media.
- Unknown paths show an in-app not-found page.
- `src/App.jsx` owns routing, the once-per-session signature intro, and deferred analytics.
- `src/pages/` contains route-level views; `src/components/` contains shared sections and UI.
- Vercel rewrites app routes to `index.html` for client-side routing.

## Current Features
- Dark/light theme, responsive header, keyboard command palette, profile-photo flip, CV viewer, and contact clock.
- Signature intro appears once per session.
- Project, experience, skills, education, and contact information is data-driven.
- Certificates currently list the two Microsoft Fabric credentials in `portfolioData.jsx`; PDFs live under `public/certificates/` and open in a new tab.
- Playground visuals and media are defined in `playgroundData.js` and the associated components/assets.

## Performance and Motion Safeguards
- Hero and Contact shaders pause when outside the viewport and respect reduced-motion preferences.
- Shader resolution is capped to an effective 1.5 device-pixel ratio on mobile.
- Skills marquee pauses while outside the viewport and when reduced motion is requested.
- Contact clock updates are isolated; the Characters rotation in the review archive respects reduced motion.
- Playground preview videos are deferred until near the viewport.
- Lower-page sections and routes are lazy-loaded; analytics load after the intro is dismissed.
- Preserve these behaviors during future cleanup.

## Current Project Status
Portfolio personalization, the certificates section, the performance changes above, and repository cleanup are present in the `final-cleanup` branch. The repository has no `LICENSE` file; do not claim a license without confirming the source and permissions.

## Verification Snapshot
As of 2026-10-03, a clean dependency install and production build passed in an isolated copy, and lint/build had passed during the prior release-preparation work. Home, Projects, project detail, and Playground routes were smoke-tested locally for missing media. This is not a substitute for cross-browser device testing or recorded Lighthouse/CPU-profile comparisons; no numeric performance score is recorded here.
