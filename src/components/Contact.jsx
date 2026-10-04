import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Dithering } from '@paper-design/shaders-react';
import { useMobileShaderPixelLimit } from '../lib/useMobileShaderPixelLimit';
import { Typography } from './ui/Typography';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('idle');
  const [isShaderVisible, setIsShaderVisible] = useState(false);
  const shaderSectionRef = useRef(null);
  const maxPixelCount = useMobileShaderPixelLimit(shaderSectionRef);
  const copyResetTimeoutRef = useRef(null);
  const email = portfolioData.contact.email;
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const element = shaderSectionRef.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsShaderVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsShaderVisible(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(copyResetTimeoutRef.current), []);

  const handleCopy = async () => {
    clearTimeout(copyResetTimeoutRef.current);

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }

    copyResetTimeoutRef.current = setTimeout(() => setCopyStatus('idle'), 2000);
  };

  return (
    <section className="flex justify-center p-4">

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative w-full
          bg-white/40 dark:bg-accent
          rounded-lg ring-1 ring-black/10 dark:ring-border/20
          p-2 shadow-2xl shadow-black/5 dark:shadow-black/10
          inset-shadow-sm inset-shadow-black/5 dark:inset-shadow-accent
        "
      >

        <div ref={shaderSectionRef} className="relative w-full rounded-lg overflow-hidden bg-primary mb-4 ring-1 ring-border shadow-inner isolate">
          <div className="absolute inset-0">
            <Dithering
              width="100%"
              height="100%"
              colorBack="#000000ff"
              colorFront="#636363ff"
              shape="ripple"
              type="2x2"
              size={2}
              maxPixelCount={maxPixelCount}
              speed={shouldReduceMotion || !isShaderVisible ? 0 : 2}
            />
          </div>

          <div className="relative z-20 h-full w-full p-5 flex flex-col justify-between text-white font-mono">
            <div className="flex justify-between items-start text-sm tracking-widest uppercase">
              <Clock />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-700 animate-pulse" />
                <span className="text-md font-light tracking-tighter">Hire Me</span>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="h3" as="h2" className="font-mono text-xl tracking-tighter text-white">
                Let&apos;s Talk
              </Typography>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[0.15rem] bg-black/80 p-[0.15rem] rounded-md">

          <TactileButton
            href={`mailto:${email}`}
            className="col-span-1 h-28"
            label="Send Mail"
          >
          </TactileButton>

          <TactileButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="col-span-1 h-28"
            label="Go To Top"
          >
          </TactileButton>

          <div className="col-span-1 flex flex-col gap-[0.15rem]">
            <TactileButton
              onClick={handleCopy}
              className="flex-1"
              label={copyStatus === 'copied' ? 'COPIED' : copyStatus === 'failed' ? 'COPY FAILED' : 'COPY MAIL'}
            >
              <span className="sr-only" role="status" aria-live="polite">
                {copyStatus === 'copied' ? 'Email address copied.' : copyStatus === 'failed' ? 'Could not copy the email address.' : ''}
              </span>
            </TactileButton>


            <TactileButton
              href="https://cal.com/manthan-gadegone/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              label="MEETING"
            >
            </TactileButton>
          </div>

        </div>

        <div className="mt-4 flex items-center justify-between px-2 opacity-40">
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 h-3 rounded-full bg-muted-foreground/20 border-[0.05rem] border-muted-foreground/20" />
            ))}
          </div>
          <span className="text-[0.8rem] font-light uppercase">MG</span>
        </div>

      </motion.div>
    </section>
  );
}

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-md font-light tracking-tighter">{time}</span>;
}

function TactileButton({ children, onClick, href, label, className = '', ...props }) {
  const Component = href ? 'a' : 'button';

  return (
    <Component
      type={href ? undefined : 'button'}
      href={href}
      onClick={onClick}
      aria-label={label}
      {...props}
      className={`
                cursor-pointer
                group relative
                overflow-hidden
                p-4 rounded-sm
                bg-[#f0f0f0] dark:bg-secondary
                border border-[#303030] dark:border-black
                inset-shadow-none dark:inset-shadow-sm dark:inset-shadow-accent
                shadow-none dark:shadow-lg
                active:scale-[0.98]
                transition-all duration-100 ease-out
                flex flex-col items-center justify-center
                ${className}
      `}
    >
      <div className="relative z-10">
        {children}
      </div>

      <div className="absolute bottom-2 left-3 flex flex-col items-start leading-none text-foreground opacity-70 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        {label && <span className="text-xs font-light tracking-wider font-mono">{label}</span>}
      </div>

    </Component>
  );
}
