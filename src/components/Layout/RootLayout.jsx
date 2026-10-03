import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import { portfolioData } from '../../data/portfolioData';

const siteUrl = 'https://manthanone.vercel.app';
const defaultDescription = 'Manthan Gadegone is a web developer and data analyst. Explore responsive web projects, data analysis work, internship experience, and Microsoft Fabric certifications.';

function setMeta(selector, content) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', content);
}

export default function RootLayout({ children }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? '#09090b' : '#f7f7f7');
  }, [isDark]);

  useEffect(() => {
    const { pathname } = location;
    const pathSegments = pathname.split('/').filter(Boolean);
    const projectSlug = pathname.startsWith('/project/')
      ? pathSegments[pathSegments.length - 1] || null
      : null;
    const project = projectSlug
      ? portfolioData.projects.find((item) => item.slug === projectSlug || item.id === projectSlug)
      : null;
    const shortName = portfolioData.hero.name.split(' ')[0];
    const pageTitle = pathname === '/'
      ? `${shortName} | Portfolio`
      : project
        ? `${project.title} | ${shortName}`
        : pathname === '/projects'
          ? `Projects | ${shortName}`
          : pathname === '/playground'
            ? `Playground | ${shortName}`
            : `Page not found | ${shortName}`;
    const sourceDescription = project
      ? project.description
      : pathname === '/projects'
        ? 'Selected web development and data analysis projects by Manthan Gadegone.'
        : pathname === '/playground'
          ? 'Creative work and design explorations by Manthan Gadegone.'
          : defaultDescription;
    const description = sourceDescription.length > 160
      ? `${sourceDescription.slice(0, 157).trimEnd()}...`
      : sourceDescription;
    const canonicalUrl = new URL(pathname, siteUrl).toString();
    const knownRoute = pathname === '/' || pathname === '/projects' || pathname === '/playground' || Boolean(project);

    document.title = pageTitle;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', pageTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', pageTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="robots"]', knownRoute ? 'index, follow' : 'noindex, follow');

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    canonicalLink?.setAttribute('href', canonicalUrl);
  }, [location]);

  const syncThemeToDOM = useCallback((isDarkMode) => {
    const root = document.documentElement;
    root.classList.add('disable-transitions');
    root.classList.toggle('dark', isDarkMode);

    try {
      window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        root.classList.remove('disable-transitions');
      });
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !isDark;
    syncThemeToDOM(next);
    setIsDark(next);
  }, [isDark, syncThemeToDOM]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isTyping = target instanceof HTMLElement &&
        (target.isContentEditable || target.matches('input, textarea, select'));

      if (
        e.key.toLowerCase() === 'd' &&
        !e.repeat &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isTyping
      ) toggleTheme();
    };

    const handleToggleEvent = () => toggleTheme();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-theme', handleToggleEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-theme', handleToggleEvent);
    };
  }, [toggleTheme]);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/20 flex flex-col">
      {/* Main Container with Bleeding Dashed Borders */}
      <div className="max-w-3xl mx-auto border-x border-dashed border-border min-h-screen relative bg-background flex flex-col w-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
        >
          Skip to content
        </a>

        {/* Global Header */}
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        {/* Page Content */}
        <main id="main-content" className="grow relative">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="relative w-full h-28 sm:h-32 flex flex-col justify-end items-center pb-8 shrink-0">
          <div className="absolute top-0 left-[calc(-50vw+50%)] w-screen border-t border-dashed border-border pointer-events-none z-10" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="space-y-1 text-center font-mono tracking-tighter sm:tracking-normal">
              <p className="text-muted-foreground uppercase text-[10px] sm:text-xs  font-medium">
                {portfolioData.footer.year} {portfolioData.footer.text}
              </p>
              <p className="text-[9px] sm:text-[10px] text-foreground tracking-normal ">
                {portfolioData.footer.love}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
