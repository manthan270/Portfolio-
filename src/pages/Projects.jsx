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
      <Typography variant="h3" as="h2">{title}</Typography>
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
  const dataProjects = projects.filter(p => p.category === 'Data Projects');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-4">
      <section className="px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h1" className="mb-4">My Projects</Typography>
          <Typography variant="p" className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            A collection of web development and data analysis projects.
          </Typography>
        </motion.div>
      </section>

      <SectionDivider />
      {webProjects.length > 0 && (
        <ProjectSection title="Web Projects" data={webProjects} subtitle="Code & Logic" />
      )}

      {dataProjects.length > 0 && (
        <>
          <SectionDivider />
          <ProjectSection title="Data Projects" data={dataProjects} subtitle="Analysis & Insights" />
        </>
      )}

      <SectionDivider />
      <div className="relative">
        <Contact />
      </div>
    </div>
  );
};


export default ProjectsPage;
