'use client';

import { useEffect, useState } from 'react';
import { Instagram, Youtube, ChatDotsFill } from 'react-bootstrap-icons';

interface FixedSnsPanelProps {
  instagramUrl?: string;
  blogUrl?: string;
  kakaoUrl?: string;
  youtubeUrl?: string;
}

function NaverBlogIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}

export default function FixedSnsPanel({
  instagramUrl = '#',
  blogUrl = '#',
  kakaoUrl = '#',
  youtubeUrl,
}: FixedSnsPanelProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const items = [
    { label: 'Instagram', href: instagramUrl, icon: <Instagram size={20} /> },
    { label: '네이버 블로그', href: blogUrl, icon: <NaverBlogIcon size={18} /> },
    { label: 'KakaoTalk', href: kakaoUrl, icon: <ChatDotsFill size={20} /> },
    ...(youtubeUrl ? [{ label: 'YouTube', href: youtubeUrl, icon: <Youtube size={20} /> }] : []),
  ];

  return (
    <>
      <div
        className="fixed-sns-panel"
        style={{
          position: 'fixed',
          right: '24px',
          top: '50%',
          transform: `translateY(-50%) ${visible ? 'translateX(0)' : 'translateX(60px)'}`,
          transition: 'transform 0.4s ease',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-soft)',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            {item.icon}
          </a>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) { .fixed-sns-panel { display: none !important; } }
      `}</style>
    </>
  );
}
