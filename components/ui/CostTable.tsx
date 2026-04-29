'use client';

interface CostItem {
  label: string;
  amount: number;
}

interface CostTableProps {
  baseArea: number;
  items: CostItem[];
  total: number;
  disclaimer: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

function formatKRW(amount: number): string {
  if (amount >= 100000000) {
    const eok = amount / 100000000;
    return eok % 1 === 0 ? `${eok}억원` : `${eok.toFixed(1)}억원`;
  }
  if (amount >= 10000) {
    const man = amount / 10000;
    return man % 1 === 0 ? `${man}만원` : `${man.toFixed(0)}만원`;
  }
  return `${amount.toLocaleString()}원`;
}

export default function CostTable({ baseArea, items, total, disclaimer, ctaLabel, onCtaClick }: CostTableProps) {
  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      <div style={{
        background: 'var(--color-bg)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {/* 헤더 */}
        <div style={{
          background: 'var(--color-accent)',
          color: 'var(--color-cta-text, #fff)',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '15px', fontWeight: '700' }}>창업 비용 항목</span>
          <span style={{ fontSize: '13px', opacity: 0.85 }}>기준 면적 {baseArea}평</span>
        </div>

        {/* 항목 리스트 */}
        <div>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 24px',
                borderBottom: i < items.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-bg-soft)',
              }}
            >
              <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>{item.label}</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>
                {formatKRW(item.amount)}
              </span>
            </div>
          ))}
        </div>

        {/* 합계 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px',
          background: 'var(--color-bg-soft)',
          borderTop: '2px solid var(--color-accent)',
        }}>
          <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text)' }}>총 예상 창업비</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-accent)' }}>
            {formatKRW(total)}
          </span>
        </div>
      </div>

      {/* 면책 고지 */}
      <p style={{
        fontSize: '12px',
        color: 'var(--color-text-soft)',
        marginTop: '12px',
        lineHeight: '1.6',
        textAlign: 'center',
      }}>
        * {disclaimer}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={onCtaClick}
            style={{
              padding: '14px 32px',
              borderRadius: '8px',
              background: 'var(--color-cta)',
              color: 'var(--color-cta-text)',
              fontSize: '15px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </div>
  );
}
