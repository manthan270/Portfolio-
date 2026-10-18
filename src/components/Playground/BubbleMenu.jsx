import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const items = [
  { label: 'Figma', id: 'figma', color: '#FF453A', initial: 'F', collapsedWidth: 48 },
  { label: '3D Arts', id: '3d', color: '#0A84FF', initial: '3D', collapsedWidth: 60 },
  { label: 'Posters', id: 'posters', color: '#FF375F', initial: 'P', collapsedWidth: 48 },
];

const SMOOTH_EASE = [0.22, 1, 0.36, 1];
const SIZE_TRANSITION = { type: 'tween', duration: 0.26, ease: SMOOTH_EASE };
const LABEL_TRANSITION = { duration: 0.14, ease: 'easeOut' };

const MenuItem = React.memo(function MenuItem({
  item,
  isActive,
  isHovered,
  isFocused,
  onSelect,
  onHover,
  onLeave,
  onFocus,
  onBlur,
}) {
  const shouldReduceMotion = useReducedMotion();
  const isHoveredOrFocused = isHovered || isFocused;
  const isHighlighted = isActive || isHoveredOrFocused;

  return (
    <motion.div
      layout="position"
      transition={shouldReduceMotion ? { duration: 0 } : SIZE_TRANSITION}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(item.id)}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={onLeave}
        onFocus={() => onFocus(item.id)}
        onBlur={onBlur}
        aria-label={item.label}
        aria-current={isActive ? 'location' : undefined}
        initial={false}
        animate={{
          width: isHighlighted ? 104 : item.collapsedWidth,
          backgroundColor: isActive
            ? item.color
            : isHoveredOrFocused
              ? `${item.color}26`
              : 'rgba(255,255,255,0.01)',
          borderColor: isHighlighted ? item.color : 'rgba(128,128,128,0.5)',
          color: isHighlighted ? 'white' : 'var(--color-muted-foreground)',
        }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={shouldReduceMotion
          ? { duration: 0 }
          : {
            width: {
              type: 'tween',
              duration: isHighlighted ? 0.26 : 0.22,
              ease: SMOOTH_EASE,
              delay: isHighlighted ? 0 : 0.08,
            },
            backgroundColor: { duration: 0.18, ease: 'easeOut' },
            borderColor: { duration: 0.18, ease: 'easeOut' },
            color: { duration: 0.14, ease: 'easeOut' },
          }}
        className="relative flex h-8 shrink-0 items-center justify-center overflow-hidden rounded-full border p-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <AnimatePresence initial={false}>
          {isHighlighted && (
            <motion.span
              key="glow"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 0.4 : 0.18 }}
              exit={{ opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : LABEL_TRANSITION}
              className="absolute inset-0 z-0 rounded-full pointer-events-none"
              style={{ boxShadow: `inset 0 0 12px ${item.color}` }}
            />
          )}
        </AnimatePresence>

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
          <span className="flex items-center justify-center px-4">
            <span className="shrink-0 text-base font-bold">{item.initial}</span>

            <AnimatePresence initial={false}>
              {isHighlighted && (
                <motion.span
                  key="label"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, x: -2 }}
                  transition={shouldReduceMotion ? { duration: 0 } : LABEL_TRANSITION}
                  className="overflow-hidden whitespace-nowrap font-bold"
                >
                  {item.label.substring(item.initial.length)}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </span>
      </motion.button>
    </motion.div>
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
  const [focusedId, setFocusedId] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleHover = useCallback((id) => setHoveredId(id), []);
  const handleLeave = useCallback(() => setHoveredId(null), []);
  const handleFocus = useCallback((id) => setFocusedId(id), []);
  const handleBlur = useCallback(() => setFocusedId(null), []);
  const handleSelect = useCallback((id) => scrollToSection(id), []);

  useEffect(() => {
    if (!activeSection || !scrollContainerRef.current) return;

    const activeButton = scrollContainerRef.current.querySelector(
      `[data-id="${activeSection}"]`
    );
    if (!activeButton) return;

    const container = scrollContainerRef.current;
    const buttonRect = activeButton.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
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
    <div
      ref={scrollContainerRef}
      className="flex w-full flex-nowrap items-center justify-start gap-3 overflow-x-auto py-2 scroll-smooth no-scrollbar md:justify-center"
    >
      {items.map((item) => (
        <div key={item.id} data-id={item.id}>
          <MenuItem
            item={item}
            isActive={activeSection === item.id}
            isHovered={hoveredId === item.id}
            isFocused={focusedId === item.id}
            onSelect={handleSelect}
            onHover={handleHover}
            onLeave={handleLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      ))}
    </div>
  );
};

export default BubbleMenu;
