import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense, useState, useCallback } from 'react';
import { MotionConfig, AnimatePresence } from 'motion/react';
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
  const [showIntro, setShowIntro] = useState(() => {
    // Only show the intro on the very first visit per session
    try {
      return !sessionStorage.getItem('intro-seen');
    } catch {
      return true;
    }
  });

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      // The intro still exits when session storage is unavailable.
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <CommandPalette />

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

        <AnimatePresence mode="wait">
          {showIntro && (
            <SignatureLoader key="intro" onComplete={dismissIntro} />
          )}
        </AnimatePresence>

        {!showIntro && (
          <Suspense fallback={null}>
            <Analytics />
            <SpeedInsights />
          </Suspense>
        )}
      </BrowserRouter>
    </MotionConfig>
  );
}
