import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const OptimizedVideo = ({ src, poster, className, ...props }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView && !shouldReduceMotion) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isInView, shouldReduceMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={shouldReduceMotion ? 'metadata' : 'none'}
      aria-hidden="true"
      className={`${className} transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
      {...props}
    />
  );
};

export default OptimizedVideo;
