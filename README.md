# Manthan Gadegone — Portfolio

Personal portfolio for Manthan Gadegone, a web developer and data analyst. The site presents project work, experience, education, skills, certificates, and contact options in a responsive React application.

> **Screenshot placeholder:** Add a current portfolio screenshot at `docs/portfolio-screenshot.png` and replace this note with the image when it is available.

## Links

- Website: [manthanone.vercel.app](https://manthanone.vercel.app/)
- GitHub: [github.com/manthan270](https://github.com/manthan270)
- LinkedIn: [linkedin.com/in/manthan-gadegone-126a7922b](https://linkedin.com/in/manthan-gadegone-126a7922b)
- Email: [manthangadegone27@gmail.com](mailto:manthangadegone27@gmail.com)
- CV: [public/CV/MANTHAN GADEGONE.pdf](public/CV/MANTHAN%20GADEGONE.pdf)

## Technology

- React 18 and React Router 7
- Vite 7
- Tailwind CSS 4
- Motion for React, Lucide icons, and Paper Design shaders
- Vercel Analytics and Speed Insights

## Run locally

Use Node.js 20.19 or newer in the 20.x line, or Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

Useful checks:

```sh
npm run lint
npm run build
npm run preview
```

## Project structure

```text
public/                   Static images, videos, certificates, CV, and icons
src/components/            Shared sections and interface components
src/data/portfolioData.jsx Portfolio content and personal details
src/data/playgroundData.js Playground content
src/pages/                 Home, project, and playground routes
src/App.jsx                Routes and app-level behavior
src/index.css              Theme tokens and global styles
vite.config.js             Vite, React, Tailwind, and bundle analysis
vercel.json                SPA routing and static asset headers
```

Update the portfolio content in `src/data/portfolioData.jsx`. Add a new certificate by placing its PDF in `public/certificates/` with a descriptive kebab-case filename, then adding one entry to the `certificates` array:

```js
{
  title: 'Certificate title',
  issuer: 'Issuing organization',
  year: 'Year shown on the certificate',
  file: '/certificates/certificate-title-issuer-year.pdf',
}
```

The file path must match the PDF's public path exactly, including capitalization. Certificate links open the PDF in a separate tab.

## Optional OX Alpha CLI

`npm run cli` starts the local OX Alpha assistant. It requires `OPENROUTER_API_KEY` in the environment or a local `.env` file. The assistant sends prompts and project-file contents returned by its tools to OpenRouter. Keep local environment files out of archives and public repositories; the repository ignore rules exclude them.

The CLI is optional. To configure it locally, copy `.env.example` to `.env` and fill in the values on your machine. Do not commit `.env`.

## Deployment and licensing

Vercel rewrites application routes to `index.html` so React Router can handle direct visits. No `LICENSE` file is present in this repository.
