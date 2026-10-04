import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { Typography } from './ui/Typography';

export default function Certificates({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4 flex flex-col items-start gap-1 pb-2 sm:flex-row sm:items-baseline sm:justify-between">
          <Typography variant="h3" as="h2">Certificates</Typography>
          <Typography
            variant="small"
            className="text-blue-900 dark:text-blue-300"
          >
            Credentials
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.map((certificate) => (
            <a
              key={certificate.file}
              href={certificate.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${certificate.title} certificate (PDF)`}
              className="group flex min-h-20 items-center justify-between gap-4 rounded-xl border border-border/50 bg-card/70 p-4 transition-colors duration-300 hover:border-border hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="font-sans text-sm font-medium leading-[20px] tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
                  {certificate.title}
                </span>
                <span className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] leading-[1.5] uppercase tracking-wider text-muted-foreground/70">
                  <span>{certificate.issuer}</span>
                  <span aria-hidden="true">·</span>
                  <span>{certificate.year}</span>
                </span>
              </span>

              <FileText
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-muted-foreground/55 transition-colors duration-300 group-hover:text-foreground/80 group-focus-visible:text-foreground"
              />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
