'use client';

import { useState, useEffect, useRef } from 'react';

interface KpiCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  animated?: boolean;
}

export default function KpiCounter({ value, suffix = '', label, duration = 2000, animated = false }: KpiCounterProps) {
  const [display, setDisplay] = useState(animated ? 0 : value);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated, value, duration]);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '8px 16px' }}>
      <div style={{
        fontSize: 'clamp(40px, 6vw, 64px)',
        fontWeight: '800',
        color: 'var(--color-accent)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: '4px',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {display.toLocaleString()}<span style={{ fontSize: '0.55em' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-soft)', fontWeight: '500', letterSpacing: '0.02em' }}>
        {label}
      </div>
    </div>
  );
}
