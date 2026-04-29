'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PortfolioItem {
  id: string;
  title: string;
  area: number;
  areaCategory: string;
  style: string[];
  spaceType: string;
  location: string;
  thumbnail: string;
  beforeImage?: string | null;
  afterImage?: string | null;
}

interface PortfolioSectionProps {
  items: PortfolioItem[];
  showFilter?: boolean;
  showBeforeAfter?: boolean;
}

const AREA_OPTIONS = ['전체', '20평↓', '30평대', '40평↑'];
const STYLE_OPTIONS = ['모던', '내추럴', '북유럽', '클래식', '미니멀'];
const SPACE_OPTIONS = ['전체', '주거', '카페', '사무실', '상가', '병원'];

export default function PortfolioSection({
  items,
  showFilter = false,
  showBeforeAfter = false,
}: PortfolioSectionProps) {
  const [areaFilter, setAreaFilter] = useState('전체');
  const [styleFilter, setStyleFilter] = useState<string[]>([]);
  const [spaceFilter, setSpaceFilter] = useState('전체');
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const [baPos, setBaPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const filtered = items.filter((p) => {
    const areaMatch = areaFilter === '전체' || p.areaCategory === areaFilter;
    const styleMatch = styleFilter.length === 0 || styleFilter.some((s) => p.style.includes(s));
    const spaceMatch = spaceFilter === '전체' || p.spaceType === spaceFilter;
    return areaMatch && styleMatch && spaceMatch;
  });

  const toggleStyle = (s: string) =>
    setStyleFilter((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const filterBtn = (active: boolean) => ({
    background: active ? 'var(--color-cta)' : 'var(--color-bg-soft)',
    color: active ? 'var(--color-cta-text)' : 'var(--color-text-soft)',
    border: `1px solid ${active ? 'var(--color-cta)' : 'var(--color-border)'}`,
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap' as const,
  });

  const handleBaDrag = (clientX: number, rect: DOMRect) => {
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setBaPos(pct);
  };

  return (
    <section id="portfolio" style={{ padding: '96px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: 'var(--color-accent)', fontSize: '13px', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '12px' }}>
            PORTFOLIO
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', color: 'var(--color-text)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            시공 사례
          </h2>
          <p style={{ color: 'var(--color-text-soft)', fontSize: '16px' }}>
            직접 시공한 공간들을 소개합니다
          </p>
        </div>

        {/* 필터 바 */}
        {showFilter && (
          <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-soft)', fontWeight: '600', minWidth: '36px' }}>평수</span>
              {AREA_OPTIONS.map((opt) => (
                <button key={opt} onClick={() => setAreaFilter(opt)} style={filterBtn(areaFilter === opt)}>{opt}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-soft)', fontWeight: '600', minWidth: '36px' }}>스타일</span>
              {STYLE_OPTIONS.map((opt) => (
                <button key={opt} onClick={() => toggleStyle(opt)} style={filterBtn(styleFilter.includes(opt))}>{opt}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-soft)', fontWeight: '600', minWidth: '36px' }}>공간</span>
              {SPACE_OPTIONS.map((opt) => (
                <button key={opt} onClick={() => setSpaceFilter(opt)} style={filterBtn(spaceFilter === opt)}>{opt}</button>
              ))}
            </div>
          </div>
        )}

        {/* 그리드 */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-soft)' }}>
            <p style={{ fontSize: '16px', marginBottom: '16px' }}>조건에 맞는 시공이 없습니다</p>
            <button onClick={() => { setAreaFilter('전체'); setStyleFilter([]); setSpaceFilter('전체'); }}
              style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 20px', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--color-text-soft)' }}>
              전체 보기
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'var(--color-bg-soft)',
                  border: '1px solid var(--color-border)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <Image src={item.thumbnail} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--color-text)', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-soft)' }}>{item.areaCategory}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-soft)', opacity: 0.4 }}>·</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-soft)' }}>{item.style.join('/')}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-soft)', opacity: 0.4 }}>·</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-soft)' }}>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 라이트박스 */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--color-bg)', borderRadius: '16px',
              maxWidth: '800px', width: '100%', overflow: 'hidden',
              maxHeight: '90vh', overflowY: 'auto',
            }}
          >
            {/* Before/After 슬라이더 (데모 2~4, beforeImage 있을 때) */}
            {showBeforeAfter && lightbox.beforeImage && lightbox.afterImage ? (
              <div
                style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none' }}
                onMouseMove={(e) => { if (dragging) handleBaDrag(e.clientX, e.currentTarget.getBoundingClientRect()); }}
                onMouseDown={() => setDragging(true)}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => setDragging(false)}
                onTouchMove={(e) => handleBaDrag(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
              >
                <Image src={lightbox.afterImage} alt="시공 후" fill style={{ objectFit: 'cover' }} sizes="800px" />
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${baPos}%` }}>
                  <div style={{ position: 'relative', width: `${10000 / baPos}%`, height: '100%' }}>
                    <Image src={lightbox.beforeImage} alt="시공 전" fill style={{ objectFit: 'cover' }} sizes="800px" />
                  </div>
                </div>
                {/* 핸들 */}
                <div style={{
                  position: 'absolute', top: 0, bottom: 0, left: `${baPos}%`,
                  transform: 'translateX(-50%)',
                  width: '3px', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', color: '#333',
                  }}>⇔</div>
                </div>
                <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', padding: '4px 10px', borderRadius: '4px' }}>BEFORE</span>
                <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', padding: '4px 10px', borderRadius: '4px' }}>AFTER</span>
              </div>
            ) : (
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                <Image src={lightbox.thumbnail} alt={lightbox.title} fill style={{ objectFit: 'cover' }} sizes="800px" />
              </div>
            )}
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '8px' }}>{lightbox.title}</h3>
              <p style={{ color: 'var(--color-text-soft)', fontSize: '14px' }}>
                {lightbox.areaCategory} · {lightbox.style.join('/')} · {lightbox.spaceType} · {lightbox.location}
              </p>
              <button onClick={() => setLightbox(null)}
                style={{ marginTop: '20px', background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '8px 20px', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--color-text-soft)', fontSize: '14px' }}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
