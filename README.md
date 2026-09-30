# Manthan Gadegone — Portfolio

A responsive portfolio site for UI/UX design and frontend development work. It is a client-rendered React application built with Vite and deployed as a single-page app on Vercel.

## Technology

- React 18 and React Router 7
- Vite 7
- Tailwind CSS 4
- Motion for React
- Lucide icons and Paper Design shaders
- Vercel Analytics and Speed Insights

## Getting started

Use Node.js 20 or newer.

```sh
npm install
npm run dev
```

The local site runs at `http://localhost:5173`.

## Project commands

```sh
npm run lint
npm run build
npm run preview
```

To create a bundle analysis report, run `npm run build -- --mode analyze`. The report is written to `stats-optimized.html` in the project root.

## Project structure

```text
public/                 Static images, videos, CV, and favicons
src/components/         Shared site sections and UI components
src/data/               Portfolio and playground content
src/pages/              Home, projects, project details, and playground routes
src/App.jsx              Routes, lazy loading, and app-level behavior
src/index.css            Theme tokens and global styles
vite.config.js           Vite, React, Tailwind, and optional bundle analysis
vercel.json              SPA routing and cache headers
```

Update the site content in `src/data/portfolioData.jsx` and `src/data/playgroundData.js`. Static image and video URLs should point to files under `public/`.

## Optional OX Alpha CLI

The `npm run cli` command starts the local OX Alpha assistant. It requires `OPENROUTER_API_KEY` in the environment or a local `.env` file. Prompts and project-file contents returned through its tools are sent to OpenRouter. Keep `.env` out of archives, public repositories, and deployments; do not provide private files to the assistant. The CLI limits its file tools to this project and permits only the lint and build commands.

## Deployment

The Vercel rewrite sends application routes to `index.html`, allowing React Router to serve direct visits to project and playground routes.
