'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  slides: string[];
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  /** 데모 3(DARK): 비디오 배경 */
  videoSrc?: string;
}

export default function HeroSection({
  slides,
  headline = '공간을 다시 채우는 디자인',
  subheadline = '강남·송파·분당 10년 경력 · 시공 50건+ · 1년 무상 A/S',
  ctaText = '무료 견적 문의 →',
  videoSrc,
}: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (prefersReduced || videoSrc) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, prefersReduced, videoSrc]);

  const handleCta = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* 배경: 비디오 또는 이미지 슬라이더 */}
      {videoSrc && !prefersReduced ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        slides.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: prefersReduced ? 'none' : 'opacity 1s ease',
            }}
          >
            <Image
              src={src}
              alt={`인테리어 시공 사례 ${i + 1}`}
              fill
              priority={i === 0}
              style={{
                objectFit: 'cover',
                transform: i === current && !prefersReduced ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 5s ease',
              }}
              sizes="100vw"
            />
          </div>
        ))
      )}

      {/* 다크 오버레이 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)',
      }} />

      {/* 텍스트 + CTA */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 80px',
        width: '100%',
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '13px',
          letterSpacing: '0.1em',
          marginBottom: '16px',
          fontWeight: '500',
        }}>
          INTERIOR DESIGN
        </p>
        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: '700',
          lineHeight: '1.15',
          marginBottom: '16px',
          letterSpacing: '-0.03em',
        }}>
          {headline}
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: 'clamp(14px, 1.5vw, 18px)',
          marginBottom: '32px',
          maxWidth: '480px',
          lineHeight: '1.6',
        }}>
          {subheadline}
        </p>
        <button
          onClick={handleCta}
          style={{
            background: 'var(--color-cta)',
            color: 'var(--color-cta-text)',
            border: 'none',
            borderRadius: '8px',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.9')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
        >
          {ctaText}
        </button>
      </div>

      {/* 슬라이더 인디케이터 */}
      {!videoSrc && slides.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`슬라이드 ${i + 1}`}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'width 0.3s, background 0.3s',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* 스크롤 인디케이터 */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        animation: prefersReduced ? 'none' : 'bounce 2s infinite',
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>SCROLL</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>↓</span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
