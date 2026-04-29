'use client';

import Image from 'next/image';

interface Owner {
  id: string;
  name: string;
  location: string;
  duration: string;
  quote: string;
  monthlyRevenue: string;
  rating: number;
  photo: string;
  video: string | null;
}

interface OwnerInterviewCardProps {
  owner: Owner;
  onVideoClick?: (owner: Owner) => void;
}

export default function OwnerInterviewCard({ owner, onVideoClick }: OwnerInterviewCardProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '7fr 3fr',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid var(--color-border)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      background: 'var(--color-bg)',
      minHeight: '320px',
    }}>
      {/* 좌 70% — 사진 */}
      <div style={{ position: 'relative', minHeight: '280px' }}>
        <Image
          src={owner.photo}
          alt={`${owner.name} 인터뷰`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 70vw"
        />
        {/* 그라디언트 오버레이 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
        }} />
        {/* 점주 이름 배지 */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          borderRadius: '8px',
          padding: '8px 14px',
        }}>
          <div style={{ color: '#fff', fontSize: '14px', fontWeight: '700' }}>{owner.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>{owner.location} · {owner.duration}</div>
        </div>
        {/* 영상 재생 버튼 */}
        {owner.video && (
          <button
            onClick={() => onVideoClick?.(owner)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
            aria-label="인터뷰 영상 재생"
          >
            {/* play triangle */}
            <span style={{
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '18px solid var(--color-accent)',
              marginLeft: '4px',
              display: 'block',
            }} />
          </button>
        )}
      </div>

      {/* 우 30% — 인용 + 매출 */}
      <div style={{
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'var(--color-bg-soft)',
      }}>
        {/* 별점 */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: i < owner.rating ? '#F5A623' : 'var(--color-border)', fontSize: '18px' }}>★</span>
          ))}
        </div>

        {/* 인용문 */}
        <blockquote style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: '1.7',
          color: 'var(--color-text)',
          fontStyle: 'italic',
          flex: 1,
        }}>
          &ldquo;{owner.quote}&rdquo;
        </blockquote>

        {/* 월 매출 강조 */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: '12px',
          background: 'var(--color-accent)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: 'var(--color-cta-text)', opacity: 0.85, marginBottom: '4px', fontWeight: '600' }}>
            월 평균 매출
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-cta-text)', letterSpacing: '-0.02em' }}>
            {owner.monthlyRevenue}
          </div>
        </div>
      </div>
    </div>
  );
}
