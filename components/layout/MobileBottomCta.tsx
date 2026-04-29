'use client';

import { TelephoneFill, ChatDotsFill, PencilSquare } from 'react-bootstrap-icons';

interface MobileBottomCtaProps {
  phone?: string;
  kakaoUrl?: string;
}

export default function MobileBottomCta({
  phone = '010-1234-5678',
  kakaoUrl = '#',
}: MobileBottomCtaProps) {
  const handleContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div
        className="mobile-cta-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: 'flex',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
        }}
      >
        <a
          href={`tel:${phone.replace(/-/g, '')}`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            textDecoration: 'none',
            color: 'var(--color-text)',
            gap: '2px',
            borderRight: '1px solid var(--color-border)',
          }}
        >
          <TelephoneFill size={20} />
          <span style={{ fontSize: '11px', fontWeight: '600' }}>전화</span>
        </a>
        <a
          href={kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            textDecoration: 'none',
            color: 'var(--color-text)',
            gap: '2px',
            borderRight: '1px solid var(--color-border)',
          }}
        >
          <ChatDotsFill size={20} />
          <span style={{ fontSize: '11px', fontWeight: '600' }}>카톡</span>
        </a>
        <button
          onClick={handleContact}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            background: 'var(--color-cta)',
            color: 'var(--color-cta-text)',
            border: 'none',
            cursor: 'pointer',
            gap: '2px',
            fontFamily: 'inherit',
          }}
        >
          <PencilSquare size={20} />
          <span style={{ fontSize: '11px', fontWeight: '600' }}>견적</span>
        </button>
      </div>
      {/* 모바일 CTA 높이만큼 하단 패딩 확보 */}
      <div className="mobile-cta-spacer" style={{ height: '68px' }} />
      <style>{`
        @media (min-width: 769px) {
          .mobile-cta-bar { display: none !important; }
          .mobile-cta-spacer { display: none !important; }
        }
      `}</style>
    </>
  );
}
