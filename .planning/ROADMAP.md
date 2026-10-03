# ROADMAP — Portfolio Stabilization and Release

**Updated:** 2026-10-03

**Working branch:** `final-cleanup`

## Current State
The portfolio is personalized for Manthan Gadegone, includes two Microsoft Fabric certificates, and has performance safeguards for animated shaders, the skills marquee, the contact clock, and below-the-fold preview videos. Repository cleanup and README updates are also present. Keep these behaviors and the current design intact while completing the remaining verification.

## Completed Work

### 1. Portfolio content and identity — COMPLETE
- Updated the portfolio identity to Manthan Gadegone and the role to Web Developer / Data Analyst.
- Added the provided profile images and the interactive photo/illustration flip.
- Updated the About text, education, experience, project details, and social/contact references from user-provided information.
- Added a responsive Certificates section backed by an array in `src/data/portfolioData.jsx`, using the Microsoft PDFs supplied for the project.

### 2. Stability, navigation, accessibility, and metadata — COMPLETE
- Added/retained direct routes for Home, Projects, project details, and Playground, plus an in-app not-found route.
- Improved route/section loading states, modal keyboard behavior, social link labels, and page metadata.
- Kept Vercel SPA routing so direct visits to client routes resolve through the app.

### 3. Performance and reduced motion — IMPLEMENTED; METRICS STILL NEEDED
- Hero and Contact shader animation pauses off-screen and follows reduced-motion preference.
- Mobile shader pixel budget is capped to an effective DPR of 1.5.
- Skills marquee pauses off-screen and for reduced-motion users.
- Contact clock updates are isolated; reduced-motion behavior is preserved in the archived Characters component.
- Playground preview video loading is deferred until close to the viewport.
- Route and lower-page code splitting remain in place; Vercel monitoring scripts load after the intro.
- **Header blur:** unchanged. Decide whether to tune it only after measuring a reproducible mobile scroll problem.
- **Performance evidence:** a numeric Lighthouse Mobile before/after comparison and a DevTools trace at 4× CPU slowdown are not recorded in this folder. Do not claim a score or a measured improvement until those are captured.

### 4. Repository cleanup and documentation — COMPLETE
- Added ignore rules for generated output, caches, local environment files, and `_to_review/`.
- Kept the signature SVG scratch files as recovery/source material and retained the archived `Characters.jsx` file so its reduced-motion fix is preserved.
- Removed the obsolete one-off crop script and four archived Playground components after checking exact names, lazy imports, dynamic imports, and `import.meta.glob`; kept the active `scripts/convert-images.js` utility.
- Added an optional, names-only `.env.example` for the local CLI and updated the README with setup, structure, and certificate instructions.
- No `LICENSE` file is present in this repository. Do not add a license claim or an attribution statement unless the owner decides to do so after checking provenance.
- Work is local on `final-cleanup`; the user handles staging, commits, and pushing.

## Remaining Checklist

### 5. Release verification — NEXT
- [ ] Confirm certificate cards open both Microsoft PDFs from the live/local site.
- [ ] Recheck 375px, 768px, 1280px, and 1920px layouts in dark and light themes.
- [ ] Check current routes and interactions in Chrome, Edge, Firefox, Safari, and a mobile browser; record any device-specific failures.
- [ ] Capture Lighthouse Mobile results and a mobile scroll Performance recording with 4× CPU slowdown; compare only if a valid baseline is available.
- [ ] Revisit header blur only if the recording demonstrates scroll jank attributable to it.
- [ ] Manually review the final Git diff and choose commit boundaries before the owner pushes.

### 6. Owner content review — INPUT NEEDED
- [ ] Confirm that project descriptions, links, dates, internship wording, CV, socials, and contact details are current and publishable.
- [ ] Confirm any desired attribution or licensing treatment only after checking the original template's actual license/provenance.

## Verification Already Recorded
- On 2026-10-03, clean dependency installation and `npm run build` passed in an isolated verification copy.
- Lint and build passed during earlier release-preparation work.
- Home, Projects, project-detail, and Playground routes were smoke-tested locally; no missing image/video/icon requests or browser-console errors were observed in that check.
- These checks do not establish cross-browser compatibility or a Lighthouse score.

## Working Rules
- Do not push, stage, commit, change remotes, or change Git settings on the owner's behalf.
- Do not remove uncertain assets or invent portfolio facts.
- Keep `_to_review/` material and its ignore rule unless the owner asks otherwise.
- Make any future code changes small and reviewable; preserve reduced-motion and performance behavior.
