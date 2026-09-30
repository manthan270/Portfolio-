import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import RootLayout from './components/Layout/RootLayout';
import SignatureLoader from './components/SignatureLoader';
import CommandPalette from './components/CommandPalette';
import LoadingState from './components/ui/LoadingState';

const Home = lazy(() => import('./pages/Home'));
const Playground = lazy(() => import('./pages/Playground'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Deferring heavier third-party scripts to avoid blocking the main thread
const Analytics = lazy(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })));
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(mod => ({ default: mod.SpeedInsights })));

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <p className="text-6xl font-bold text-foreground/20 mb-4">404</p>
      <h1 className="text-xl font-semibold text-foreground mb-2">Page not found</h1>
      <p className="text-sm text-muted-foreground mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link to="/" className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
        Go back home
      </Link>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoading(false);
      return undefined;
    }

    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading && !prefersReducedMotion && <SignatureLoader key="loader" />}
      </AnimatePresence>
      <CommandPalette />

      {/* Page content reveals with a cinematic entrance once the loader exits */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, y: 16 }}
        animate={
          isLoading && !prefersReducedMotion
            ? { opacity: 0, scale: 0.98, y: 16 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <RootLayout>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RootLayout>
      </motion.div>
      <Suspense fallback={null}>
        {!isLoading && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </Suspense>
    </BrowserRouter>
  );
}

