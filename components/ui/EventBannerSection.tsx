'use client';

import { useState } from 'react';
import EventModal from './EventModal';

interface CurriculumItem {
  time: string;
  topic: string;
}

interface EventBannerProps {
  title: string;
  schedule: string;
  location: string;
  seatsLeft: number;
  curriculum: CurriculumItem[];
  benefits: string[];
}

export default function EventBannerSection(props: EventBannerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-cta) 100%)',
        padding: '60px 24px',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.08em' }}>
            무료 가맹 설명회 · {props.schedule}
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: '900', color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            {props.title}
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '6px' }}>
            📍 {props.location}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
            선착순 {props.seatsLeft}석 — 참석 시 혜택 제공
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
            {props.benefits.map((b) => (
              <span key={b} style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '20px', padding: '5px 12px',
                fontSize: '13px', color: '#fff', fontWeight: '600',
              }}>
                🎁 {b}
              </span>
            ))}
          </div>
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: '15px 40px',
              borderRadius: '8px',
              background: '#fff',
              color: 'var(--color-accent)',
              fontSize: '16px',
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            설명회 자세히 보기 →
          </button>
        </div>
      </section>

      <EventModal
        isOpen={open}
        event={props}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
