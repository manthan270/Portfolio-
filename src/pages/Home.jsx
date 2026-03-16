import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import { portfolioData } from '../data/portfolioData';
import SectionDivider from '../components/ui/SectionDivider';

const Experience = lazy(() => import('../components/Experience'));
const Project = lazy(() => import('../components/Project'));
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

      <Suspense fallback={<div className="min-h-[200px]" />}>
        <div id="education" className="relative">
          <Education data={portfolioData.education} />
        </div>

        <SectionDivider />

        <div id="projects" className="relative">
          <Project data={portfolioData.projects} />
        </div>

        <SectionDivider />

        <div id="experience" className="relative">
          <Experience data={portfolioData.experience} />
        </div>

        <SectionDivider />

        <div id="skills" className="relative">
          <Skills data={portfolioData.skills} />
        </div>

        <SectionDivider />

        <div id="playground" className="relative">
          <PlaygroundPreview />
        </div>

        <SectionDivider />

        <div id="contact" className="relative">
          <Contact />
        </div>
      </Suspense>
    </>
  );
}

