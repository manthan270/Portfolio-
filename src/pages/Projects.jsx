import { useEffect } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { Typography } from '../components/ui/Typography';
import Contact from '../components/Contact';
import SectionDivider from '../components/ui/SectionDivider';

const ProjectSection = ({ title, data, subtitle }) => (
  <section className="px-4 py-8">
    <div className="flex items-baseline justify-between mb-6 pb-2">
      <Typography variant="h3">{title}</Typography>
      <Typography variant="small" className="text-muted-foreground uppercase font-mono tracking-wider">
        {subtitle || `${data.length} Works`}
      </Typography>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((project, index) => (
        <ProjectCard key={project.id || project.title} project={project} index={index} />
      ))}
    </div>
  </section>
);

const ProjectsPage = () => {
  const { projects } = portfolioData;

  const webProjects = projects.filter(p => p.category === 'Web Projects');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-4">
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h1" className="mb-4">My Projects</Typography>
          <Typography variant="p" className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            A collection of my work spanning web development, UI/UX design, and in-depth case studies.
            Each project represents a unique challenge and a step forward in my design journey.
          </Typography>
        </motion.div>
      </section>

      <SectionDivider />
      <ProjectSection title="Web Projects" data={webProjects} subtitle="Code & Logic" />

      <SectionDivider />
      <div className="relative">
        <Contact />
      </div>
    </main>
  );
};


export default ProjectsPage;
