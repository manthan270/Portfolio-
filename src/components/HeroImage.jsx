import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from 'motion/react';

export default function HeroImage({ src, alt }) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (shouldReduceMotion) {
      video.pause();
      setIsActive(false);
      return undefined;
    }

    let isMounted = true;
    video.currentTime = 0;
    setIsActive(true);
    video.play().catch(() => {
      if (isMounted) setIsActive(false);
    });

    return () => {
      isMounted = false;
      video.pause();
    };
  }, [shouldReduceMotion]);

  // Handle video end - switch to image
  useEffect(() => {
    const handleVideoEnd = () => {
      setIsActive(false);
      videoNode.currentTime = 0;
    };

    const videoNode = videoRef.current;
    if (videoNode) {
      videoNode.addEventListener("ended", handleVideoEnd);
      return () => {
        videoNode.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, []);

  const handleMouseEnter = () => {
    if (!shouldReduceMotion && videoRef.current && !isActive) {
      setIsActive(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      setIsActive(false);
      videoRef.current.pause();
    }
  };

  // For mobile/touch devices
  const handleTouch = () => {
    if (!shouldReduceMotion && videoRef.current && !isActive) {
      setIsActive(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer select-none bg-muted"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouch}
    >
      <img
        src={src}
        alt={alt}
        width={800}
        height={800}
        loading="eager" /* Hero image shouldn't be lazy loaded */
        decoding="async"
        sizes="(max-width: 768px) 400px, 800px"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: isActive ? 0 : 1,
          transform: isActive ? "scale(1.02)" : "scale(1)"
        }}
      />

      {/* Autoplay/Hover/Tap Video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1.02)" : "scale(1)"
        }}
      >
        <source src="/videos/hero-video.webm" type="video/webm" />
      </video>
    </div>
  );
}
