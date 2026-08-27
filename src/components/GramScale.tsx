import { useState, useEffect, useRef, useCallback, RefObject } from 'react';

interface TickData {
  value: string;
  gramDisplay: string;
  isMajor: boolean;
  label?: string;
}

// 12 marcas con las mayores en las posiciones 1, 5, 9 y 12 (índices 0, 4, 8 y 11)
const TICKS: TickData[] = [
  { value: '05', gramDisplay: '05 g', isMajor: true, label: '05' },
  { value: '10', gramDisplay: '10 g', isMajor: false },
  { value: '15', gramDisplay: '15 g', isMajor: false },
  { value: '18', gramDisplay: '18 g', isMajor: false },
  { value: '20', gramDisplay: '20 g', isMajor: true, label: '20' },
  { value: '25', gramDisplay: '25 g', isMajor: false },
  { value: '30', gramDisplay: '30 g', isMajor: false },
  { value: '35', gramDisplay: '35 g', isMajor: false },
  { value: '40', gramDisplay: '40 g', isMajor: true, label: '40' },
  { value: '45', gramDisplay: '45 g', isMajor: false },
  { value: '50', gramDisplay: '50 g', isMajor: false },
  { value: '60', gramDisplay: '60 g', isMajor: true, label: '60 g' },
];

const REST_INDEX = 4; // Posición 5: '20' (20 g)

interface GramScaleProps {
  heroRef: RefObject<HTMLElement | null>;
}

export default function GramScale({ heroRef }: GramScaleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number>(REST_INDEX);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detección de reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Actualización del ancho del contenedor vía ResizeObserver
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
      setIsMobile(window.innerWidth < 768);
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

  // Manejo del movimiento del cursor en el Hero para cálculo preciso de coordenadas
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || prefersReducedMotion || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      const mouseX = e.clientX - rect.left;
      const fraction = Math.max(0, Math.min(1, mouseX / rect.width));
      const totalTicks = TICKS.length;
      const rawIndex = Math.round(fraction * (totalTicks - 1));
      const clampedIndex = Math.max(0, Math.min(totalTicks - 1, rawIndex));

      setActiveIndex(clampedIndex);
    },
    [isMobile, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile || prefersReducedMotion) return;
    setActiveIndex(REST_INDEX);
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const heroElement = heroRef.current;
    if (!heroElement) return;

    let rafId: number | null = null;

    const onMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };

    heroElement.addEventListener('mousemove', onMove, { passive: true });
    heroElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      heroElement.removeEventListener('mousemove', onMove);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [heroRef, handleMouseMove, handleMouseLeave, isMobile, prefersReducedMotion]);

  // Soporte táctil y ciclo automático en mobile
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    let isInteracting = false;
    let resumeTimeout: NodeJS.Timeout | null = null;

    const interval = setInterval(() => {
      if (!isInteracting) {
        setActiveIndex((prev) => (prev + 1) % TICKS.length);
      }
    }, 1300);

    const handleTouch = (e: TouchEvent) => {
      if (!containerRef.current) return;
      isInteracting = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);

      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      const touchX = touch.clientX - rect.left;
      const fraction = Math.max(0, Math.min(1, touchX / rect.width));
      const rawIndex = Math.round(fraction * (TICKS.length - 1));
      const clampedIndex = Math.max(0, Math.min(TICKS.length - 1, rawIndex));

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
  }, [isMobile, prefersReducedMotion]);

  // Cálculos métricos de coordenadas SVG
  const totalTicks = TICKS.length;
  const tickStep = totalTicks > 1 && containerWidth > 0 ? containerWidth / (totalTicks - 1) : 0;
  const activeX = activeIndex * tickStep;
  const activeTick = TICKS[activeIndex] || TICKS[REST_INDEX];

  const BASELINE_Y = 52;
  const SVG_HEIGHT = 88;

  // Alineación óptica del valor según posición horizontal para evitar desbordes
  let indicatorTextAnchor: 'start' | 'middle' | 'end' = 'middle';
  if (activeIndex === 0) {
    indicatorTextAnchor = 'start';
  } else if (activeIndex === totalTicks - 1) {
    indicatorTextAnchor = 'end';
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full overflow-visible select-none"
      aria-label="Escala interactiva de gramaje"
      role="region"
    >
      <svg
        width="100%"
        height={SVG_HEIGHT}
        className="block w-full max-w-full overflow-visible"
        style={{ width: '100%' }}
      >
        {/* Línea base a ancho completo (0% a 100%) */}
        <line
          x1="0"
          y1={BASELINE_Y}
          x2={containerWidth || '100%'}
          y2={BASELINE_Y}
          stroke="#D8DADC"
          strokeWidth="1"
          className="anim-hero-baseline"
        />

        {/* Marcas (12 marcas) */}
        {TICKS.map((tick, index) => {
          const x = index * tickStep;
          const isCurrentActive = index === activeIndex;
          const tickHeight = tick.isMajor ? 28 : 14;
          const y1 = BASELINE_Y - tickHeight;
          const y2 = BASELINE_Y;
          const strokeColor = isCurrentActive
            ? '#0D1B2E'
            : tick.isMajor
            ? '#C89B32'
            : '#D8DADC';

          // Entrada animada
          const animDelay = `${700 + index * 35}ms`;

          // Alineación de etiquetas mayores: 05 al inicio, 60 g al final (alineada a la derecha)
          let labelAnchor: 'start' | 'middle' | 'end' = 'middle';
          if (index === 0) {
            labelAnchor = 'start';
          } else if (index === totalTicks - 1) {
            labelAnchor = 'end';
          }

          return (
            <g
              key={`${tick.value}-${index}`}
              className="origin-bottom"
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : `heroTickFade 400ms var(--ease-industrial) ${animDelay} forwards`,
                opacity: prefersReducedMotion ? 1 : 0,
              }}
            >
              {/* Marca */}
              <line
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke={strokeColor}
                strokeWidth={isCurrentActive ? 1.5 : 1}
                className="transition-colors duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Etiqueta mayor inferior */}
              {tick.isMajor && (
                <text
                  x={x}
                  y={BASELINE_Y + 20}
                  textAnchor={labelAnchor}
                  fill="#5F6771"
                  className="type-data"
                  style={{
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tick.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Indicador móvil acoplado rigurosamente al índice activo */}
        <g
          className="anim-hero-indicator-entry"
          style={{
            transform: `translateX(${activeX}px)`,
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Lectura numérica sobre la marca activa */}
          <text
            x={0}
            y={BASELINE_Y - 46}
            textAnchor={indicatorTextAnchor}
            fill="#0D1B2E"
            className="type-data font-medium"
            style={{
              fontSize: '13px',
              whiteSpace: 'nowrap',
            }}
          >
            {activeTick.gramDisplay}
          </text>

          {/* Barra vertical de 2px (40px de altura) */}
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
