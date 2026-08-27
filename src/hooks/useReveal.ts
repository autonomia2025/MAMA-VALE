import { useEffect, useRef, useState, CSSProperties } from 'react';

type RevealCallback = (isIntersecting: boolean) => void;

let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, RevealCallback>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const cb = observerCallbacks.get(target);
            if (cb) {
              cb(true);
              observerCallbacks.delete(target);
              sharedObserver?.unobserve(target);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );
  }
  return sharedObserver;
}

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsRevealed(true);
      return;
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsRevealed(true);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Shared IntersectionObserver registration
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = getSharedObserver();
    if (!observer) {
      setIsRevealed(true);
      return;
    }

    observerCallbacks.set(element, (isIntersecting) => {
      if (isIntersecting) {
        setIsRevealed(true);
      }
    });

    observer.observe(element);

    return () => {
      observerCallbacks.delete(element);
      observer.unobserve(element);
    };
  }, [prefersReducedMotion]);

  /**
   * Helper to get standard 700ms reveal styles with up to 5 staggered items (80ms offset).
   * Beyond the 5th element (index >= 4), all elements enter together with the delay of the 5th.
   */
  const getStyle = (index: number = 0): CSSProperties => {
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'none',
      };
    }

    const clampedIndex = Math.min(Math.max(0, index), 4); // Max 5 items: 0, 1, 2, 3, 4
    const delayMs = clampedIndex * 80;

    return {
      opacity: isRevealed ? 1 : 0,
      transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    };
  };

  return { ref, isRevealed, prefersReducedMotion, getStyle };
}
