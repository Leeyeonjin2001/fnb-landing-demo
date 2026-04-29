'use client';

import { useEffect } from 'react';

interface CurriculumItem {
  time: string;
  topic: string;
}

interface EventData {
  title: string;
  schedule: string;
  location: string;
  seatsLeft: number;
  curriculum: CurriculumItem[];
  benefits: string[];
}

interface EventModalProps {
  isOpen: boolean;
  event: EventData;
  onClose: () => void;
}

export default function EventModal({ isOpen, event, onClose }: EventModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-bg)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        }}
      >
        {/* 상단 배너 */}
        <div style={{
          background: 'var(--color-accent)',
          padding: '28px 24px',
          borderRadius: '20px 20px 0 0',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px',
              color: '#fff', cursor: 'pointer', fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="닫기"
          >
            ×
          </button>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.05em' }}>
            무료 가맹 설명회
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
            {event.title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>📅 {event.schedule}</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>📍 {event.location}</span>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>🪑 선착순 {event.seatsLeft}석 남음</span>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {/* 커리큘럼 */}
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '12px' }}>
            📋 설명회 커리큘럼
          </h4>
          <div style={{ marginBottom: '20px' }}>
            {event.curriculum.map((item) => (
              <div key={item.time} style={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr',
                gap: '12px',
                padding: '10px 0',
                borderBottom: '1px solid var(--color-border)',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', color: 'var(--color-accent)', fontWeight: '600' }}>{item.time}</span>
                <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>{item.topic}</span>
              </div>
            ))}
          </div>

          {/* 참석 혜택 */}
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '12px' }}>
            🎁 참석 혜택
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {event.benefits.map((b) => (
              <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text)' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: '700', flexShrink: 0 }}>✓</span>
                {b}
              </li>
            ))}
          </ul>

          {/* 신청 버튼 */}
          <a
            href="#contact"
            onClick={onClose}
            style={{
              display: 'block',
              width: '100%',
              padding: '16px',
              borderRadius: '10px',
              background: 'var(--color-cta)',
              color: 'var(--color-cta-text, #fff)',
              fontSize: '16px',
              fontWeight: '800',
              textDecoration: 'none',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            지금 바로 신청하기 →
          </a>
          <button
            onClick={onClose}
            style={{
              display: 'block', width: '100%', marginTop: '10px',
              padding: '12px', borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'transparent', color: 'var(--color-text-soft)',
              fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
