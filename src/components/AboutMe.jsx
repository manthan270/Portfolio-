import { motion } from 'motion/react';
import { Typography } from './ui/Typography';
import './AboutMe.css';

export default function AboutMe() {
    return (
        <section className="py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="about-container bg-card border border-border/50 rounded-2xl shadow-sm"
            >
                <div className="flex items-baseline mb-6 md:mb-8">
                    <Typography variant="h3">About Me</Typography>
                </div>

                <div className="flex flex-col gap-4 text-muted-foreground">
                    <Typography variant="body" className="about-text">
                        I am an Electronics & Telecommunication Engineering graduate passionate about UI/UX Design, Frontend Development, and Web Development — building clean, intuitive, and responsive digital experiences.
                    </Typography>
                    <Typography variant="body" className="about-text">
                        I bring hands-on experience with SQL, Excel, Python, data analysis, requirement gathering, and AI-assisted solutions — with strong communication and documentation skills across cross-functional teams.
                    </Typography>
                    <Typography variant="body" className="about-text">
                        I turn complex ideas into simple, elegant digital products — focused on design that not only looks great but works beautifully for the people using it.
                    </Typography>
                </div>
            </motion.div>
        </section>
    );
}
