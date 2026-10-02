import { motion } from 'motion/react';
import { Typography } from './ui/Typography';

export default function AboutMe({ data }) {
    if (!data) return null;
    return (
        <section className="py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border/50 rounded-2xl shadow-sm p-8 md:p-10"
            >
                <div className="flex items-baseline mb-6 md:mb-8">
                    <Typography variant="h3" as="h2">About Me</Typography>
                </div>

                <div className="flex flex-col gap-4 text-muted-foreground">
                    <Typography variant="body" className="font-semibold text-foreground">
                        {data.greeting}
                    </Typography>
                    {data.paragraphs.map((paragraph) => (
                        <Typography key={paragraph} variant="body">
                            {paragraph}
                        </Typography>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
