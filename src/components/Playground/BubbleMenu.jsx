import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const items = [
  { label: 'Figma', id: 'figma', color: '#FF453A', initial: 'F' },
  { label: '3D Arts', id: '3d', color: '#0A84FF', initial: '3D' },
  { label: 'Posters', id: 'posters', color: '#FF375F', initial: 'P' },
];

const SPRING = { type: 'spring', stiffness: 350, damping: 30 };
// Softer spring dedicated to glows — a slower settle makes blooms feel
// weighty and physical rather than snappy UI ticks.
const GLOW_SPRING = { type: 'spring', stiffness: 210, damping: 24 };
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];
const SHEEN_EASE = [0.4, 0, 0.2, 1];

/* ------------------------------------------------------------------ */
/* Glow layers                                                          */
/* Every layer animates ONLY opacity/transform so the browser keeps     */
/* them on the compositor. Shadows/gradients are pre-rendered once and  */
/* cross-faded — never animated directly (which forces repaints).       */
/* ------------------------------------------------------------------ */

// Layer A — soft radial halo blooming outward like a light source
const HaloBloom = React.memo(function HaloBloom({ color, active }) {
  const shouldReduceMotion = useReducedMotion();
  const strength = shouldReduceMotion ? 0 : 1;

  return (
    <motion.span
      aria-hidden="true"
      className="absolute -inset-2 rounded-full pointer-events-none z-0"
      initial={false}
      animate={{
        opacity: active ? 0.95 * strength : 0,
        scale: active ? 1 : 0.55,
      }}
      transition={{ ...GLOW_SPRING, delay: active ? 0.03 : 0 }}
      style={{
        background: `radial-gradient(closest-side, ${color}66, transparent 72%)`,
        filter: 'blur(8px)',
        willChange: 'opacity, transform',
      }}
    />
  );
});

// Layer B — crisp glowing ring hugging the pill border; anchors the stack
const RingGlow = React.memo(function RingGlow({ color, active }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 rounded-full pointer-events-none z-0"
      initial={false}
      animate={{ opacity: active ? 0.9 : 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
      style={{
        boxShadow: `0 0 18px ${color}99, inset 0 0 10px ${color}4D`,
        willChange: 'opacity',
      }}
    />
  );
});

// Layer C — slow conic shimmer orbiting the pill while hovered.
// Mounted only while hovered (no idle CPU cost), rotation is pure transform.
const OrbitShimmer = React.memo(function OrbitShimmer({ color, active }) {
  const shouldReduceMotion = useReducedMotion();
  const enabled = active && !shouldReduceMotion;

  return (
    <AnimatePresence>
      {enabled && (
        <motion.span
          key="orbit"
          aria-hidden="true"
          className="absolute -inset-1 rounded-full pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 0.85, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{
              padding: '2px',
              background: `conic-gradient(from 0deg, transparent 0deg, ${color}00 60deg, ${color} 180deg, ${color}00 300deg, transparent 360deg)`,
              // Mask out the centre so only a thin rotating ring renders
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              willChange: 'transform',
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, ease: 'linear', repeat: Infinity }}
          />
        </motion.span>
      )}
    </AnimatePresence>
  );
});

// Layer D — interior tint cross-fades smoothly (no abrupt mount/unmount)
const InteriorTint = React.memo(function InteriorTint({ color, active }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 rounded-full pointer-events-none z-0"
      initial={false}
      animate={{ opacity: active ? 0.5 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        boxShadow: `inset 0 0 15px ${color}`,
        willChange: 'opacity',
      }}
    />
  );
});

// Layer E — ambient light the pill "casts" onto the surface beneath it
const GroundGlow = React.memo(function GroundGlow({ color, active }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute top-full left-1/2 mt-1.5 h-2.5 w-4/5 rounded-full pointer-events-none z-0"
      initial={false}
      animate={{
        opacity: active ? 0.55 : 0,
        scaleX: active ? 1 : 0.4,
        x: '-50%',
      }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: active ? 0.05 : 0 }}
      style={{
        background: `radial-gradient(ellipse at center, ${color}73, transparent 70%)`,
        filter: 'blur(4px)',
        willChange: 'opacity, transform',
      }}
    />
  );
});

const MenuItem = React.memo(function MenuItem({
  item,
  isActive,
  isHovered,
  onSelect,
  onHover,
  onLeave,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      layout
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(item.id)}
      onBlur={onLeave}
      initial={false}
      animate={{
        backgroundColor: isActive ? item.color : 'rgba(255,255,255,0.01)',
        borderColor: isActive
          ? item.color
          : isHovered
            ? `${item.color}B3`
            : 'rgba(128,128,128,0.5)',
        color: isActive ? 'white' : 'var(--color-muted-foreground)',
        minWidth: isActive ? '100px' : '48px',
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.07, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={SPRING}
      className="relative h-8 flex items-center justify-center rounded-full border cursor-pointer px-1"
    >
      {/* Glow stack (bottom → top): halo, orbit, ring, interior tint, ground light */}
      <HaloBloom color={item.color} active={isHovered} />
      <OrbitShimmer color={item.color} active={isHovered} />
      <RingGlow color={item.color} active={isHovered} />
      <InteriorTint color={item.color} active={isActive} />
      <GroundGlow color={item.color} active={isHovered} />

      {/* Sheen sweep across the pill on hover */}
      {!shouldReduceMotion && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none z-[1] overflow-hidden"
        >
          <motion.span
            className="absolute top-0 bottom-0 left-0 w-1/2 -skew-x-12"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
            }}
            initial={false}
            animate={isHovered ? { x: ['-160%', '260%'] } : { x: '-160%' }}
            transition={{ duration: 0.8, ease: SHEEN_EASE }}
          />
        </span>
      )}

      {/* Content Layer */}
      <div className="flex items-center justify-center relative z-10 px-4">
        <motion.span layout="position" className="shrink-0 font-bold text-base">
          {item.initial}
        </motion.span>

        <AnimatePresence mode="popLayout">
          {isActive && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -5, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -2, filter: 'blur(2px)' }}
              transition={SPRING}
              className="font-bold whitespace-nowrap overflow-hidden"
            >
              {item.label.substring(item.initial.length)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
});

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (!section) return;

  const headerOffset = 130;
  const elementPosition = section.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - headerOffset;

  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
};

const BubbleMenu = ({ activeSection }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const scrollContainerRef = useRef(null);

  // Stable callbacks so React.memo on MenuItem actually prevents re-renders
  const handleHover = useCallback((id) => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);
  const handleSelect = useCallback((id) => scrollToSection(id), []);

  // Auto-scroll active item into view
  useEffect(() => {
    if (!activeSection || !scrollContainerRef.current) return;

    const activeButton = scrollContainerRef.current.querySelector(
      `[data-id="${activeSection}"]`
    );
    if (!activeButton) return;

    const container = scrollContainerRef.current;
    const buttonRect = activeButton.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Only scroll if the active button is not clearly visible
    const isVisible =
      buttonRect.left >= containerRect.left &&
      buttonRect.right <= containerRect.right;

    if (!isVisible) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeSection]);

  return (
    // py-3 gives the outer halo breathing room inside the overflow-x-auto container
    <div
      ref={scrollContainerRef}
      className="flex flex-nowrap items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar py-3 w-full scroll-smooth"
    >
      {items.map((item) => (
        <div key={item.id} data-id={item.id}>
          <MenuItem
            item={item}
            isActive={activeSection === item.id || hoveredId === item.id}
            isHovered={hoveredId === item.id}
            onSelect={handleSelect}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        </div>
      ))}
    </div>
  );
};

export default BubbleMenu;
