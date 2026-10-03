import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import {
   Github,
   Cpu,
   ListChecks,
   LayoutDashboard,
   Play,
 } from 'lucide-react';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';

const SectionLabel = ({ icon: Icon, label }) => (
   <div className="flex items-center gap-2 mb-4">
      <Icon size={16} className="text-muted-foreground" />
      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
   </div>
);

const ProjectDetail = () => {
   const { slug } = useParams();
   const navigate = useNavigate();

   // Derive project data synchronously on first render
   const project = portfolioData.projects.find(p => p.slug === slug || p.id === slug);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [slug]);

   // If project is not found after derived attempt
   if (!project) {
      return (
         <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
            <Typography variant="h2" className="mb-4">Project not found</Typography>
            <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
         </div>
      );
   }

   const hasVideo = !!project.videoUrl;
   const hasFigma = !!project.figmaUrl;
   const projectLink = project.link;
   const isGithub = projectLink?.includes('github.com');

   const getEmbedUrl = (url) => {
      if (!url) return '';
      if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
      if (url.includes('youtube.com/watch?v=')) return `https://www.youtube.com/embed/${url.split('v=')[1].split('&')[0]}`;
      return url;
   };

   return (
      <div className="pt-4 pb-32">

         {/* Title */}
         <section className="px-4 mb-8">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
               <Typography variant="h1">
                  {project.title}
               </Typography>
            </motion.div>
         </section>

         {/* Media Card */}
         <section className="px-4 mb-12">
            <motion.div
               initial={{ opacity: 0, scale: 0.98, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
               className="rounded-xl border border-border bg-background shadow-lg overflow-hidden"
            >
               <div className={`relative w-full bg-secondary/5 ${hasFigma ? 'aspect-[4/3]' : 'aspect-video'}`}>
                  {hasVideo ? (
                     <iframe
                        className="w-full h-full"
                        src={getEmbedUrl(project.videoUrl)}
                        title={project.title}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                     />
                  ) : hasFigma ? (
                     <iframe
                        className="w-full h-full"
                        src={project.figmaUrl}
                        title={`${project.title} prototype`}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                     />
                  ) : (
                     <img
                        src={project.image}
                        srcSet={project.imageSrcSet}
                        alt={project.title}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="w-full h-full object-contain"
                     />
                  )}
                  <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none" />
               </div>

               {/* Actions Bar */}
               <div className="border-t border-border bg-secondary/10 p-4 flex items-center justify-center gap-3">
                  {projectLink && (
                     <Button
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="md"
                        icon={isGithub ? Github : Play}
                        aria-label={isGithub ? 'View project repository on GitHub' : 'Open live project'}
                        className="min-w-40 rounded-lg border-border/70 bg-secondary/40 px-4 font-semibold shadow-sm transition-[background-color,border-color,box-shadow] hover:border-border hover:bg-secondary/70 hover:shadow-md"
                     >
                        {isGithub ? 'View on GitHub' : 'Live project'}
                     </Button>
                  )}
               </div>
            </motion.div>
         </section>

         {/* Details */}
         <section className="px-4 flex flex-col gap-12">

            {/* Overview */}
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
            >
               <SectionLabel icon={LayoutDashboard} label="Overview" />
               <p className="text-muted-foreground leading-relaxed text-sm">
                  {project.fullDescription || project.description}
               </p>
            </motion.div>

            {/* Tech Stack */}
            {project.techStack?.length > 0 && (
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 }}
               >
                  <SectionLabel icon={Cpu} label="Tech Stack" />
                  <div className="flex flex-wrap gap-2">
                     {project.techStack.map((tech, i) => (
                        <span
                           key={i}
                           className="px-3 py-1.5 text-xs font-medium rounded-full border border-border/60 bg-secondary/20 text-foreground/80 tracking-wide"
                        >
                           {tech}
                        </span>
                     ))}
                  </div>
               </motion.div>
            )}

            {/* Features */}
            {project.features && (
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
               >
                  <SectionLabel icon={ListChecks} label="Features" />
                  <div className="flex flex-col gap-3">
                     {project.features.map((feature, i) => {
                        const colonIdx = feature.indexOf(':');
                        const title = colonIdx !== -1 ? feature.slice(0, colonIdx).trim() : feature;
                        const desc = colonIdx !== -1 ? feature.slice(colonIdx + 1).trim() : '';

                        return (
                           <div
                              key={i}
                              className="flex gap-4 p-2 px-4 rounded-lg border border-border/50 bg-secondary/50 hover:bg-secondary/20 transition-colors"
                           >
                              <span className="shrink-0 w-4 h-4 flex bg-primary/20 items-center justify-center rounded-full border border-border/60 text-xs font-mono text-white mt-2">
                                 {String(i + 1).padStart(2, '0')}
                              </span>
                              <div className="flex flex-col gap-0.5">
                                 <span className="text-sm font-semibold text-foreground">{title}</span>
                                 {desc && (
                                    <span className="text-xs text-muted-foreground leading-relaxed">{desc}</span>
                                 )}
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </motion.div>
            )}

         </section>
      </div>
   );
};

export default ProjectDetail;
