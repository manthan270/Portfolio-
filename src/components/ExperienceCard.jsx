import { useState, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Typography } from './ui/Typography';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';

export const ExperienceCard = memo(({ experience, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Timeline bar */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border/20 group-last:bottom-auto group-last:h-4" />
      <div className={`absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent from-0% via-primary via-20% to-transparent to-90% transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />

      {/* Diamond dot */}
      <div className={`absolute left-[-5px] top-4 w-[11px] h-[11px] bg-background border rotate-45 z-10 transition-colors duration-200 ${isOpen ? 'border-primary bg-primary' : 'border-border group-hover:border-primary/60'}`}>
        <div className={`absolute inset-[3px] bg-background transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Card */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left pl-8 pr-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-md cursor-pointer"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${experience.role} at ${experience.company}`}
      >
        {/* Always-visible header row */}
        <div className="flex items-center justify-between gap-3 min-w-0">
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <Typography
              variant="h4"
              className={`text-sm font-semibold tracking-tight leading-tight truncate transition-colors duration-200 ${isOpen ? 'text-foreground' : 'text-foreground/75 group-hover:text-foreground'}`}
            >
              {experience.role}
            </Typography>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs font-mono text-muted-foreground/70 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 shrink-0" />
                <span className="break-words">{experience.company}</span>
              </span>
              <span className="text-border hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 shrink-0" />
                <span className="whitespace-nowrap">{experience.period}</span>
              </span>
            </div>
          </div>

          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? 'rotate-180 text-foreground' : 'rotate-0'}`}
          />
        </div>
      </button>

      {/* Expanding content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.22,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="overflow-hidden"
          >
            <div className="pl-8 pr-3 pb-4 flex flex-col gap-3">
              {/* Description */}
              {experience.description && (
                <div className="relative bg-secondary/40 px-3 py-2 rounded-md inset-shadow-sm">
                  <Typography
                    variant="body"
                    className="text-sm leading-relaxed text-muted-foreground/80"
                  >
                    {experience.description}
                  </Typography>
                </div>
              )}

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5">
                {(experience.technologies ?? []).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-muted-foreground uppercase tracking-wider bg-secondary/50 border border-border rounded-md px-2 py-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ExperienceCard.displayName = 'ExperienceCard';
