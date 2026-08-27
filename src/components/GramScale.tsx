import { useState, useEffect, useRef, useMemo, useCallback, RefObject } from 'react';

interface TickData {
  value: string;
  gramDisplay: string;
  isMajor: boolean;
  label?: string;
  hasUnit?: boolean;
}

const DESKTOP_TICKS: TickData[] = [
  { value: '05', gramDisplay: '05g', isMajor: true, label: '05' },
  { value: '10', gramDisplay: '10g', isMajor: false },
  { value: '15', gramDisplay: '15g', isMajor: false },
  { value: '20', gramDisplay: '20g', isMajor: true, label: '20' },
  { value: '25', gramDisplay: '25g', isMajor: false },
  { value: '30', gramDisplay: '30g', isMajor: false },
  { value: '40', gramDisplay: '40g', isMajor: true, label: '40' },
  { value: '45', gramDisplay: '45g', isMajor: false },
  { value: '50', gramDisplay: '50g', isMajor: false },
  { value: '60', gramDisplay: '60g', isMajor: true, label: '60', hasUnit: true },
  { value: '70', gramDisplay: '70g', isMajor: false },
  { value: '80', gramDisplay: '80g', isMajor: false },
];

const TABLET_TICKS: TickData[] = [
  { value: '05', gramDisplay: '05g', isMajor: true, label: '05' },
  { value: '10', gramDisplay: '10g', isMajor: false },
  { value: '15', gramDisplay: '15g', isMajor: false },
  { value: '20', gramDisplay: '20g', isMajor: true, label: '20' },
  { value: '30', gramDisplay: '30g', isMajor: false },
  { value: '40', gramDisplay: '40g', isMajor: true, label: '40' },
  { value: '50', gramDisplay: '50g', isMajor: false },
  { value: '60', gramDisplay: '60g', isMajor: true, label: '60', hasUnit: true },
];

const MOBILE_TICKS: TickData[] = [
  { value: '05', gramDisplay: '05g', isMajor: true, label: '05' },
  { value: '10', gramDisplay: '10g', isMajor: false },
  { value: '20', gramDisplay: '20g', isMajor: true, label: '20' },
  { value: '30', gramDisplay: '30g', isMajor: false },
  { value: '40', gramDisplay: '40g', isMajor: true, label: '40' },
  { value: '60', gramDisplay: '60g', isMajor: true, label: '60', hasUnit: true },
];

interface GramScaleProps {
  heroRef: RefObject<HTMLElement | null>;
}


export default function GramScale({ heroRef }: GramScaleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeIndex, setActiveIndex] = useState<number>(3); // 20g default
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Update container width and responsive mode
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setContainerWidth(width);
      }
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setViewportMode('mobile');
      } else if (windowWidth < 1200) {
        setViewportMode('tablet');
      } else {
        setViewportMode('desktop');
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      resizeObserver?.disconnect();
    };
  }, []);

  // Current ticks configuration based on viewport
  const ticks = useMemo(() => {
    if (viewportMode === 'mobile') return MOBILE_TICKS;
    if (viewportMode === 'tablet') return TABLET_TICKS;
    return DESKTOP_TICKS;
  }, [viewportMode]);

  // Set default rest index when viewport mode changes
  useEffect(() => {
    const restIdx = ticks.findIndex((t) => t.value === '20');
    setActiveIndex(restIdx !== -1 ? restIdx : 0);
  }, [ticks]);

  // Mobile auto-loop animation + touch drag support
  useEffect(() => {
    if (viewportMode !== 'mobile' || prefersReducedMotion) return;

    let isInteracting = false;
    let resumeTimeout: NodeJS.Timeout | null = null;

    const interval = setInterval(() => {
      if (!isInteracting) {
        setActiveIndex((prev) => (prev + 1) % ticks.length);
      }
    }, 1200);

    const handleTouch = (e: TouchEvent) => {
      if (!containerRef.current) return;
      isInteracting = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);

      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const totalTicks = ticks.length;
      if (totalTicks <= 1 || rect.width <= 0) return;

      const step = rect.width / (totalTicks - 1);
      const rawIndex = Math.round(touchX / step);
      const clampedIndex = Math.max(0, Math.min(totalTicks - 1, rawIndex));
      setActiveIndex(clampedIndex);
    };

    const handleTouchEnd = () => {
      resumeTimeout = setTimeout(() => {
        isInteracting = false;
      }, 2500);
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('touchstart', handleTouch, { passive: true });
      containerEl.addEventListener('touchmove', handleTouch, { passive: true });
      containerEl.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      clearInterval(interval);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      if (containerEl) {
        containerEl.removeEventListener('touchstart', handleTouch);
        containerEl.removeEventListener('touchmove', handleTouch);
        containerEl.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [viewportMode, ticks.length, prefersReducedMotion]);

  // Snap to closest mark based on cursor position in Hero
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (viewportMode === 'mobile' || prefersReducedMotion) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const totalTicks = ticks.length;
      if (totalTicks <= 1 || rect.width <= 0) return;

      const step = rect.width / (totalTicks - 1);
      const rawIndex = Math.round(mouseX / step);
      const clampedIndex = Math.max(0, Math.min(totalTicks - 1, rawIndex));

      setActiveIndex(clampedIndex);
    },
    [viewportMode, prefersReducedMotion, ticks.length]
  );

  useEffect(() => {
    if (viewportMode === 'mobile' || prefersReducedMotion) return;

    const heroElement = heroRef.current;
    if (!heroElement) return;

    let rafId: number | null = null;

    const onMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };

    heroElement.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      heroElement.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [heroRef, handleMouseMove, viewportMode, prefersReducedMotion]);

  // Compute coordinate metrics
  const totalTicks = ticks.length;
  const tickStep = totalTicks > 1 ? containerWidth / (totalTicks - 1) : 0;
  const activeX = Math.round(activeIndex * tickStep);
  const activeTick = ticks[activeIndex] || ticks[0];

  const BASELINE_Y = 52;
  const SVG_HEIGHT = 88;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full overflow-hidden select-none"
      aria-label="Escala interactiva de gramaje"
      role="region"
    >
      <svg
        width="100%"
        height={SVG_HEIGHT}
        className="block w-full max-w-full"
        style={{ width: '100%' }}
      >
        {/* Baseline (animated with scaleX on entrance) */}
        <line
          x1={0}
          y1={BASELINE_Y}
          x2={containerWidth || '100%'}
          y2={BASELINE_Y}
          stroke="#D8DADC"
          strokeWidth="1"
          className="anim-hero-baseline"
        />

        {/* Ticks */}
        {ticks.map((tick, index) => {
          const x = Math.round(index * tickStep);
          const isCurrentActive = index === activeIndex;
          const tickHeight = tick.isMajor ? 28 : 14;
          const y1 = BASELINE_Y - tickHeight;
          const y2 = BASELINE_Y;
          const strokeColor = isCurrentActive
            ? '#0D1B2E'
            : tick.isMajor
            ? '#C89B32'
            : '#D8DADC';

          // Delay for entrance animation (starts at 700ms + index * 35ms)
          const animDelay = `${700 + index * 35}ms`;

          return (
            <g
              key={`${viewportMode}-${tick.value}-${index}`}
              className="origin-bottom"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `heroTickFade 400ms var(--ease-industrial) ${animDelay} forwards`,
                opacity: prefersReducedMotion ? 1 : 0,
              }}
            >
              {/* Tick Mark */}
              <line
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke={strokeColor}
                strokeWidth={isCurrentActive ? 1.5 : 1}
                className="transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Major Label Below */}
              {tick.isMajor && (
                <text
                  x={x}
                  y={BASELINE_Y + 20}
                  textAnchor="middle"
                  fill="#5F6771"
                  className="type-data"
                  style={{ fontSize: '13px' }}
                >
                  {tick.label}
                </text>
              )}

              {/* Unit 'g' under the last major mark */}
              {tick.hasUnit && (
                <text
                  x={x}
                  y={BASELINE_Y + 34}
                  textAnchor="middle"
                  fill="#8A6A1F"
                  className="type-label"
                  style={{ fontSize: '10px' }}
                >
                  g
                </text>
              )}
            </g>
          );
        })}

        {/* Moving Indicator (snapped to active mark) */}
        <g
          className="anim-hero-indicator-entry"
          style={{
            transform: `translateX(${activeX}px)`,
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Indicator Value Above */}
          <text
            x={0}
            y={BASELINE_Y - 44}
            textAnchor="middle"
            fill="#0D1B2E"
            className="type-data font-medium"
            style={{ fontSize: '13px' }}
          >
            {activeTick?.gramDisplay || '20g'}
          </text>

          {/* Indicator 2px Vertical Bar (40px high) */}
          <line
            x1={0}
            y1={BASELINE_Y - 40}
            x2={0}
            y2={BASELINE_Y}
            stroke="#0D1B2E"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
