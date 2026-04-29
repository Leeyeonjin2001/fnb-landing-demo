'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, XLg } from 'react-bootstrap-icons';

const NAV_ITEMS = [
  { label: '소개', href: '#about' },
  { label: '포트폴리오', href: '#portfolio' },
  { label: '시공 과정', href: '#process' },
  { label: '후기', href: '#review' },
  { label: '문의', href: '#contact' },
];

interface HeaderProps {
  companyName?: string;
}

export default function Header({ companyName = 'OO인테리어' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, box-shadow 0.3s',
        background: scrolled ? 'var(--color-bg)' : 'transparent',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.08)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* 로고 */}
        <Link href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ textDecoration: 'none', fontWeight: '700', fontSize: '18px', color: scrolled ? 'var(--color-text)' : '#fff', letterSpacing: '-0.02em' }}
        >
          {companyName}
        </Link>

        {/* 데스크탑 네비 */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
          className="hidden-mobile"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: scrolled ? 'var(--color-text-soft)' : 'rgba(255,255,255,0.85)',
                transition: 'color 0.2s',
                fontFamily: 'inherit',
                padding: '4px 0',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            style={{
              background: 'var(--color-cta)',
              color: 'var(--color-cta-text)',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            견적 문의
          </button>
        </nav>

        {/* 햄버거 (모바일) */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: scrolled ? 'var(--color-text)' : '#fff',
          }}
        >
          {menuOpen ? <XLg size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* 모바일 드로어 */}
      {menuOpen && (
        <div style={{
          background: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
          padding: '16px 24px 24px',
        }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '14px 0',
                fontSize: '16px',
                fontWeight: '500',
                color: 'var(--color-text)',
                borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            style={{
              marginTop: '16px',
              width: '100%',
              background: 'var(--color-cta)',
              color: 'var(--color-cta-text)',
              border: 'none',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            무료 견적 문의 →
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}
