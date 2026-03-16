import { motion } from 'motion/react';
import { Typography } from './ui/Typography';
import { Calendar01Icon, UniversityIcon, Location01Icon } from 'hugeicons-react';

export default function Education({ data }) {
    if (!data) return null;

    return (
        <section className="px-4 py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-baseline justify-between mb-4 pb-2">
                    <Typography variant="h3">Education</Typography>
                    <Typography variant="small" className="text-muted-foreground">MY BACKGROUND</Typography>
                </div>

                <div className="space-y-4">
                    {data.map((education, index) => (
                        <motion.div
                            key={education.institution || index}
                            className="group relative px-8 py-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-border/20 group-last:bottom-auto group-last:h-4" />

                            <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent from-0% via-primary via-20% to-transparent to-90% opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute left-[-5px] top-4 w-[11px] h-[11px] bg-background border border-border rotate-45 group-hover:border-primary group-hover:bg-primary transition-all duration-300 z-10">
                                <div className="absolute inset-[3px] bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="relative flex flex-col gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <Typography
                                        variant="h3"
                                        className="text-lg font-semibold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-300"
                                    >
                                        {education.title}
                                    </Typography>

                                    <div className="flex flex-col gap-1.5 mt-1 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <UniversityIcon className="w-3 h-3 opacity-70" />
                                            <span>{education.institution}</span>
                                        </div>

                                        {education.location && (
                                            <div className="flex items-center gap-1.5">
                                                <Location01Icon className="w-3 h-3 opacity-70" />
                                                <span>{education.location}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-1.5">
                                            <Calendar01Icon className="w-3 h-3 opacity-70" />
                                            <span>{education.period}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
