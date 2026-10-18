import React, { useState, useEffect, Suspense } from 'react';
import { playgroundData } from '../data/playgroundData';
import { motion } from 'motion/react';

import BubbleMenu from '../components/Playground/BubbleMenu';
import { Typography } from '../components/ui/Typography';
import SectionDivider from '../components/ui/SectionDivider';



// Lazy load heavy playground sections
const FigmaExploration = React.lazy(() => import('../components/Playground/Exploration'));
const Posters = React.lazy(() => import('../components/Playground/Posters'));
const ThreeDArts = React.lazy(() => import('../components/Playground/ThreeDArts'));





const SectionSkeleton = () => (
  <div role="status" aria-label="Loading playground section" className="w-full py-16 flex items-center justify-center opacity-20">
    <span className="sr-only">Loading playground section</span>
    <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin motion-reduce:animate-none" />
  </div>
);

export default function Playground() {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const sectionIds = ['figma', '3d', 'posters'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    let frameId = null;

    const updateActiveSection = () => {
      frameId = null;
      const activationLine = window.innerHeight * 0.5;
      let activeSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top > activationLine) break;
        activeSection = section;
      }

      setActiveSection(activeSection?.id ?? null);
    };

    const scheduleUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>

      {/* --- Hero Section (Manifest Style) --- */}
      <div className="px-4 py-8 relative pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Typography variant="h3" as="h1" className="mb-2">
            {playgroundData.hero.title}
          </Typography>

          <Typography variant="p" className="text-muted-foreground text-sm leading-relaxed mb-4">
            {playgroundData.hero.subtitle}
          </Typography>
        </motion.div>
      </div>

      {/* Sticky Menu Bar */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-dashed border-border px-4 py-2 mb-8">
        <BubbleMenu activeSection={activeSection} />
      </div>

      <SectionDivider />

      {/* --- Content Sections --- */}
      <div className="px-4 pb-32 space-y-8">

        {/* Spinner shown per section independently */}
        <div id="figma">
          <Suspense fallback={<SectionSkeleton />}>
            <FigmaExploration data={playgroundData.figma} />
          </Suspense>
        </div>

        <SectionDivider />

        <div id="3d">
          <Suspense fallback={<SectionSkeleton />}>
            <ThreeDArts data={playgroundData.threeD} />
          </Suspense>
        </div>

        <SectionDivider />

        <div id="posters">
          <Suspense fallback={<SectionSkeleton />}>
            <Posters data={playgroundData.posters} />
          </Suspense>
        </div>

      </div>
    </>
  );
}
