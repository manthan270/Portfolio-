import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import { portfolioData } from '../data/portfolioData';
import SectionDivider from '../components/ui/SectionDivider';

const Experience = lazy(() => import('../components/Experience'));
const ProjectsSection = lazy(() => import('../components/ProjectsSection'));
const Skills = lazy(() => import('../components/Skills'));
const Education = lazy(() => import('../components/Education'));
const Contact = lazy(() => import('../components/Contact'));
const PlaygroundPreview = lazy(() => import('../components/PlaygroundPreview'));

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div id="hero" className="relative">
        <Hero data={portfolioData.hero} />
      </div>

      <SectionDivider />

      <div id="about" className="relative">
        <AboutMe />
      </div>

      <SectionDivider />

      <Suspense fallback={<div>Loading...</div>}>
        <div id="education" className="relative">
          <Education data={portfolioData.education} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<div>Loading...</div>}>
        <div id="projects" className="relative">
          <ProjectsSection data={portfolioData.projects} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<div>Loading...</div>}>
        <div id="experience" className="relative">
          <Experience data={portfolioData.experience} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<div>Loading...</div>}>
        <div id="skills" className="relative">
          <Skills data={portfolioData.skills} />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<div>Loading...</div>}>
        <div id="playground" className="relative">
          <PlaygroundPreview />
        </div>
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<div>Loading...</div>}>
        <div id="contact" className="relative">
          <Contact />
        </div>
      </Suspense>
    </>
  );
}
