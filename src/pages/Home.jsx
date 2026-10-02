import { Suspense, lazy } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import { portfolioData } from '../data/portfolioData';
import SectionDivider from '../components/ui/SectionDivider';
import LoadingState from '../components/ui/LoadingState';

const Experience = lazy(() => import('../components/Experience'));
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const Skills = lazy(() => import('../components/Skills'));
const Education = lazy(() => import('../components/Education'));
const Contact = lazy(() => import('../components/Contact'));
const PlaygroundPreview = lazy(() => import('../components/PlaygroundPreview'));
const Certificates = lazy(() => import('../components/Certificates'));

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    let sectionId;
    try {
      sectionId = decodeURIComponent(location.hash.slice(1));
    } catch {
      return undefined;
    }
    if (!sectionId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <>
      {/* Hero Section */}
      <div id="hero" className="relative scroll-mt-16">
        <Hero data={portfolioData.hero} />
      </div>

      <SectionDivider />

      <div id="about" className="relative scroll-mt-16">
        <AboutMe data={portfolioData.about} />
      </div>

      <SectionDivider />

      <Suspense fallback={<LoadingState compact />}>
        <div id="education" className="relative scroll-mt-16">
          <Education data={portfolioData.education} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<LoadingState compact />}>
        <div id="projects" className="relative scroll-mt-16">
          <ProjectsSection data={portfolioData.projects} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<LoadingState compact />}>
        <div id="experience" className="relative scroll-mt-16">
          <Experience data={portfolioData.experience} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<LoadingState compact />}>
        <div id="skills" className="relative scroll-mt-16">
          <Skills data={portfolioData.skills} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<LoadingState compact />}>
        <div id="playground" className="relative scroll-mt-16">
          <PlaygroundPreview />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<LoadingState compact />}>
        <div id="certificates" className="relative scroll-mt-16">
          <Certificates data={portfolioData.certificates} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<LoadingState compact />}>
        <div id="contact" className="relative scroll-mt-16">
          <Contact />
        </div>
      </Suspense>
    </>
  );
}
