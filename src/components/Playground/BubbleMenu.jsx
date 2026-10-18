import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const items = [
  { label: 'Figma', id: 'figma', color: '#FF453A', initial: 'F' },
  { label: '3D Arts', id: '3d', color: '#0A84FF', initial: '3D' },
  { label: 'Posters', id: 'posters', color: '#FF375F', initial: 'P' },
];

const SPRING = { type: 'spring', stiffness: 350, damping: 30 };

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
  const isHighlighted = isActive || isHovered || isFocused;

  return (
    <motion.button
      layout
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
        backgroundColor: isHighlighted ? item.color : 'rgba(255,255,255,0.01)',
        borderColor: isHighlighted ? item.color : 'rgba(128,128,128,0.5)',
        color: isHighlighted ? 'white' : 'var(--color-muted-foreground)',
        minWidth: isHighlighted ? '100px' : '48px',
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
      transition={shouldReduceMotion ? { duration: 0 } : SPRING}
      className="relative flex h-8 items-center justify-center rounded-full border px-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {isHighlighted && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          className="absolute inset-0 z-0 rounded-full pointer-events-none"
          style={{ boxShadow: `inset 0 0 15px ${item.color}` }}
        />
      )}

      <span className="relative z-10 flex items-center justify-center px-4">
        <motion.span layout="position" className="shrink-0 text-base font-bold">
          {item.initial}
        </motion.span>

        <AnimatePresence initial={false} mode="popLayout">
          {isHighlighted && (
            <motion.span
              key="label"
              initial={shouldReduceMotion ? false : { opacity: 0, x: -5, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -2, filter: 'blur(2px)' }}
              transition={shouldReduceMotion ? { duration: 0 } : SPRING}
              className="overflow-hidden whitespace-nowrap font-bold"
            >
              {item.label.substring(item.initial.length)}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
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
