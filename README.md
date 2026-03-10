<div align="center">
  <img alt="Project Banner" src="public/thumbnail.png" width="100%" style="border-radius: 12px; margin-bottom: 2rem;" />

  <h1>Manthan Gadegone's Portfolio</h1>
  <p><strong>A modern, highly interactive, and uniquely designed personal portfolio website showcasing creatively engineered web experiences. Built with an emphasis on "Cosmic Minimalism", smooth animations, and a focus on both aesthetics and performance. Welcome to my digital space!</strong></p>

  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-00d8ff?style=flat-square&logo=react&logoColor=black" alt="React 19" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" /></a>
    <a href="https://gsap.com/"><img src="https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" /></a>
    <a href="https://motion.dev/"><img src="https://img.shields.io/badge/Motion-12-FF0080?style=flat-square&logo=framer&logoColor=white" alt="Motion" /></a>
    <a href="https://github.com/manthan270/Portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License: MIT" /></a>
  </p>
</div>

<br />

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Getting Started](#️-getting-started)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing & Usage](#-contributing--usage)
- [📄 License](#-license)

---

## 🚀 Features

- **Cosmic Minimalism Aesthetic:** A refined, sleek, and void-like design language offering an immersive deep-space vibe to users.
- **Advanced Animations:** Smooth transitions and complex interactions using GSAP for heavy lifting and Motion for declarative React-based spring physics.
- **Native View Transitions:** Incorporates the native CSS View Transitions API for a seamless, buttery circular-reveal theme toggle (Dark/Light mode).
- **Command Palette:** A fully functional `Ctrl+K` / `Cmd+K` global command palette for lightning-fast, keyboard-first navigation across the entire portfolio.
- **Interactive Playground Gallery:** Explore UI pages, 3D arts, and posters with an innovative horizontal marquee and bento grid layout featuring hover-to-play video previews.
- **Project Showcases:** Categorized displays for Web Projects, UI Projects, and In-depth Case Studies with immaculate media aspect ratio management.
- **Accessible & Responsive:** Fully responsive layouts focusing on mobile-view porting without compromising features, plus a11y considerations for keyboard navigation.

---

## 🛠️ Tech Stack

### Framework & Routing
- [**React 19**](https://react.dev/) - UI Library
- [**Vite**](https://vitejs.dev/) - Next Generation Frontend Tooling
- [**React Router DOM**](https://reactrouter.com/) - Declarative Routing

### Styling
- [**Tailwind CSS v4**](https://tailwindcss.com/) - Utility-first CSS framework
- **Vanilla CSS** - For core layout structures & complex CSS variables
- `clsx` & `tailwind-merge` - Dynamic class construction

### Animations
- [**GSAP (GreenSock)**](https://gsap.com/) - High-performance property animations, scroll-triggered events.
- [**Motion**](https://motion.dev/) - Fluid, spring-based component animation and lifecycle transitions.
- **CSS View Transitions API** - Native DOM transition handling.
- `tailwindcss-animate` - Tailwind utility classes for basic CSS keyframe animations.

### Assets & Optimization
- [**HugeIcons React**](https://hugeicons.com/) - Comprehensive premium icon library.
- [**Vercel Analytics**](https://vercel.com/analytics) - Privacy-friendly traffic insights.

---

## ⚙️ Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manthan270/Portfolio.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Portfolio
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Development

Start the Vite development server:

```bash
npm run dev
```

Your application will be available at [`http://localhost:5173`](http://localhost:5173).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

A brief overview of the top-level project architecture:

```text
/
├── public/                # Static graphical assets (images, videos, logic-less files)
├── src/
│   ├── components/        # Reusable UI components (Buttons, Modals, System UI)
│   │   ├── Layout/        # RootLayout and structural wrappers
│   │   └── ui/            # Granular base UI components
│   ├── data/              # Static content configurations and site data
│   ├── pages/             # Route-level components (Home, Projects, Playground)
│   ├── index.css          # Global stylesheet containing variables and core base setups
│   └── main.jsx           # React DOM entry point
├── eslint.config.js       # Linter configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js*    # Optional depending on Tailwind v4 setup
└── vite.config.js         # Build tool configuration
```

---

## 🤝 Contributing & Usage

This is my personal portfolio template currently tailored specifically to showcase my work. However, feel free to explore the code, draw inspiration, fork the concept, and adapt the components for your own digital showcases!

If you find a bug or have an optimization suggestion, feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). 
