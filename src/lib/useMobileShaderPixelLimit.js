import { useLayoutEffect, useState } from 'react';

const MOBILE_BREAKPOINT = '(max-width: 767px)';
const MAX_MOBILE_PIXEL_RATIO = 1.5;

export function useMobileShaderPixelLimit(elementRef) {
  const [maxPixelCount, setMaxPixelCount] = useState(undefined);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const updatePixelLimit = () => {
      if (!mobileQuery.matches) {
        setMaxPixelCount(undefined);
        return;
      }

      const { width, height } = element.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setMaxPixelCount(Math.ceil(width * height * MAX_MOBILE_PIXEL_RATIO ** 2));
      }
    };

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(updatePixelLimit);
    if (resizeObserver) {
      resizeObserver.observe(element);
    } else {
      window.addEventListener('resize', updatePixelLimit, { passive: true });
    }

    const supportsMediaChangeEvent = typeof mobileQuery.addEventListener === 'function';
    if (supportsMediaChangeEvent) {
      mobileQuery.addEventListener('change', updatePixelLimit);
    } else {
      mobileQuery.addListener(updatePixelLimit);
    }
    updatePixelLimit();

    return () => {
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', updatePixelLimit);
      if (supportsMediaChangeEvent) {
        mobileQuery.removeEventListener('change', updatePixelLimit);
      } else {
        mobileQuery.removeListener(updatePixelLimit);
      }
    };
  }, [elementRef]);

  return maxPixelCount;
}
