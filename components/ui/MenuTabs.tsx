'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MenuItem {
  name: string;
  image: string;
  description: string;
}

interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

interface MenuTabsProps {
  categories: MenuCategory[];
}

export default function MenuTabs({ categories }: MenuTabsProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');

  const active = categories.find((c) => c.id === activeId);

  return (
    <div>
      {/* 탭 바 */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        marginBottom: '24px',
        scrollbarWidth: 'none',
      }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            style={{
              padding: '9px 20px',
              borderRadius: '24px',
              border: `1.5px solid ${activeId === cat.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: activeId === cat.id ? 'var(--color-accent)' : 'transparent',
              color: activeId === cat.id ? 'var(--color-cta-text, #fff)' : 'var(--color-text-soft)',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.18s',
              fontFamily: 'inherit',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 메뉴 그리드 */}
      {active && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}>
          {active.items.map((item) => (
            <div
              key={item.name}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="220px"
                />
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '3px' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-soft)' }}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
