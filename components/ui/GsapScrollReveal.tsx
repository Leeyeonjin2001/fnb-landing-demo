'use client';

import { useEffect, useRef } from 'react';

interface GsapScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}

export default function GsapScrollReveal({ children, delay = 0, y = 40 }: GsapScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    let gsap: typeof import('gsap').gsap | undefined;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | undefined;

    const init = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    };

    init();
  }, [delay, y]);

  return <div ref={ref}>{children}</div>;
}
