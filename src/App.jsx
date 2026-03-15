import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RootLayout from './components/Layout/RootLayout';
import SignatureLoader from './components/SignatureLoader';
import CommandPalette from './components/CommandPalette';

const Home = lazy(() => import('./pages/Home'));
const Playground = lazy(() => import('./pages/Playground'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Deferring heavier third-party scripts to avoid blocking the main thread
const Analytics = lazy(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })));
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(mod => ({ default: mod.SpeedInsights })));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading && <SignatureLoader key="loader" />}
      </AnimatePresence>
      <CommandPalette />

      {/* Page content reveals with a cinematic entrance once the loader exits */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={
          isLoading
            ? { opacity: 0, scale: 0.98, y: 16 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <RootLayout>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
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

