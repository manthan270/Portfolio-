import { useState, useEffect } from 'react';
import { Palette, ArrowLeft, Search, Sun, Moon } from 'lucide-react';
import DesignSystem from './DesignSystem';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Typography } from './ui/Typography';

import { portfolioData } from '../data/portfolioData';

export default function Header({ isDark, toggleTheme }) {
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [showProgressHeader, setShowProgressHeader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowProgressHeader(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getPageContext = () => {
    const path = location.pathname;
    if (path === '/') return { title: portfolioData.hero.name, subtitle: portfolioData.hero.roles[0], root: true };
    if (path.startsWith('/project/')) return { title: 'View Project', subtitle: 'Case Study', root: false };
    if (path === '/projects') return { title: 'Projects', subtitle: 'Work Archive', root: false };
    if (path === '/playground') return { title: 'Playground', subtitle: 'Creative Archive', root: false };
    return { title: 'Portfolio', subtitle: 'Manthan', root: true };
  };

  const context = getPageContext();

  return (
    <>
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="absolute top-0 left-[calc(-50vw+50%)] w-screen h-full border-b border-dashed border-border pointer-events-none" />

        <div className="flex items-center justify-between px-4 h-14 relative z-10">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {!context.root && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Go back"
                onClick={() => navigate(location.pathname.startsWith('/project/') ? '/projects' : '/')}
                className="w-8 h-8 rounded-full border border-border/50 bg-secondary/10 hover:bg-secondary transition-colors"
              >
                <ArrowLeft size={14} />
              </Button>
            )}

            <AnimatePresence mode="wait">
              {(showProgressHeader || context.root) && (
                <motion.div
                  key={context.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex min-w-0 items-center gap-2"
                >
                  <img
                    src={portfolioData.hero.headerImage}
                    alt={portfolioData.hero.name}
                    width="128"
                    height="128"
                    loading="lazy"
                    decoding="async"
                    className="h-8 w-8 shrink-0 rounded-md object-cover"
                  />
                  <div className="flex min-w-0 flex-col">
                    <Typography variant="h4" className="max-w-full truncate text-sm font-bold leading-none tracking-tight">
                      {context.title}
                    </Typography>
                    <Typography variant="small" className="max-w-full truncate text-[9px] text-muted-foreground font-mono uppercase tracking-wide sm:text-[10px]">
                      {context.subtitle}
                    </Typography>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="ml-2 flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className="hidden md:flex items-center gap-2 px-2 py-1.5 bg-secondary/50 border border-border/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <Search size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Search...</span>
              <div className="flex items-center gap-1 ml-2">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border/50 rounded text-muted-foreground">{navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border/50 rounded text-muted-foreground">K</kbd>
              </div>
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className="md:hidden rounded-full w-9 h-9 hover:bg-muted"
              aria-label="Search"
            >
              <Search size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDesignSystem(true)}
              className="rounded-full w-9 h-9 hover:bg-muted"
              aria-label="View Design System"
            >
              <Palette size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 hover:bg-muted"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
                  ) : (
                    <Moon size={18} className="text-muted-foreground hover:text-foreground transition-colors" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      <DesignSystem isOpen={showDesignSystem} onClose={() => setShowDesignSystem(false)} />
    </>
  );
}

