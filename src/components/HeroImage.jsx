import { useState, useRef, useEffect } from "react";

export default function HeroImage({ src, videoSrc, alt }) {
  const [isActive, setIsActive] = useState(true); // Start with video
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const videoRef = useRef(null);

  // Autoplay video once on mount
  useEffect(() => {
    if (videoRef.current && !hasAutoPlayed) {
      setHasAutoPlayed(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle potential autoplay blocks quietly
        setIsActive(false);
      });
    }
  }, [hasAutoPlayed]);

  // Handle video end - switch to image
  useEffect(() => {
    const handleVideoEnd = () => {
      setIsActive(false);
      // We don't reset currentTime immediately here to avoid a "rewind" flash
      // We let the fade-out happen first
      setTimeout(() => {
        if (videoRef.current) videoRef.current.currentTime = 0;
      }, 300); // Match transition duration
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
    if (videoRef.current && !isActive) {
      setIsActive(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      setIsActive(false);
      videoRef.current.pause();
      // Reset time after fade allows for smoother exit
    }
  };

  // For mobile/touch devices
  const handleTouch = () => {
    if (videoRef.current && !isActive) {
      setIsActive(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
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
        srcSet={`${src.replace('.webp', '-400.webp')} 400w, ${src.replace('.webp', '-800.webp')} 800w, ${src} 1200w`}
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
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1.02)" : "scale(1)"
        }}
      >
        <source src="/videos/hero-video.webm" type="video/webm" />
        <source src="/videos/heymain.mp4" type="video/mp4" />
      </video>
    </div>
  );
}