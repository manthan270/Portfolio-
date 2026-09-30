import { motion } from 'motion/react';
import { Typography } from './ui/Typography';

export default function AboutMe() {
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
                    <Typography variant="h3">About Me</Typography>
                </div>

                <div className="flex flex-col gap-4 text-muted-foreground">
                    <Typography variant="body" className="font-semibold text-foreground">
                        Hi, I&apos;m Manthan.
                    </Typography>
                    <Typography variant="body">
                        My Electronics and Telecommunication Engineering background taught me how to decode complex systems. I bring that exact mindset to web development and data analysis today. My responsive frontend builds prioritize clean design and straightforward usability.
                    </Typography>
                    <Typography variant="body">
                        On the data side, I analyze information using Excel, SQL, Python, Pandas, and Power BI. Through personal projects and internships, I learned to clean messy datasets and write queries to spot trends. I build visual dashboards that make complex results easy to read.
                    </Typography>
                    <Typography variant="body">
                        I am actively seeking open roles or projects. If your team needs help, please send a message or book a quick call.
                    </Typography>
                </div>
            </motion.div>
        </section>
    );
}
