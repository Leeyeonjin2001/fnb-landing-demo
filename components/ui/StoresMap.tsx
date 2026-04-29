'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Store {
  id: string;
  name: string;
  address: string;
  openDate: string;
  image: string;
  phone: string;
}

interface RegionCount {
  name: string;
  count: number;
}

interface StoresMapProps {
  stores: Store[];
  regionCounts: RegionCount[];
  totalCount: number;
  naverMapClientId?: string;
}

export default function StoresMap({ stores, regionCounts, totalCount, naverMapClientId }: StoresMapProps) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // 네이버 지도 API 키가 없으면 SVG 한국 지도 폴백
  const hasMapApi = !!naverMapClientId;

  return (
    <div>
      {/* 지도 영역 */}
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-soft)',
        marginBottom: '32px',
        minHeight: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {hasMapApi ? (
          <iframe
            src={`https://map.naver.com/v5/embed?clientId=${naverMapClientId}&center=127.0,36.5&zoom=7`}
            style={{ width: '100%', height: '400px', border: 'none' }}
            title="전국 매장 지도"
          />
        ) : (
          /* 폴백: 한국 윤곽 + 시도별 핀 시각화 */
          <div style={{ width: '100%', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '16px',
            }}>
              {regionCounts.map((r) => (
                <div key={r.name} style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-cta-text, #fff)',
                  borderRadius: '20px',
                  padding: '8px 18px',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span>{r.name}</span>
                  <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '10px', padding: '1px 8px', fontSize: '13px' }}>{r.count}개</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-soft)', marginTop: '8px' }}>
              전국 {totalCount}개 매장 운영 중
            </p>
          </div>
        )}
      </div>

      {/* 대표 매장 카드 그리드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        {stores.map((store) => (
          <div
            key={store.id}
            onClick={() => setSelectedStore(store)}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1.5px solid ${selectedStore?.id === store.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
              cursor: 'pointer',
              background: 'var(--color-bg)',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ position: 'relative', aspectRatio: '4/3' }}>
              <Image src={store.image} alt={store.name} fill style={{ objectFit: 'cover' }} sizes="220px" />
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '3px' }}>
                {store.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-soft)', marginBottom: '2px' }}>
                {store.address}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-soft)' }}>
                {store.openDate} 오픈
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 매장 상세 */}
      {selectedStore && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedStore(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--color-bg)',
              borderRadius: '16px',
              maxWidth: '480px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <Image src={selectedStore.image} alt={selectedStore.name} fill style={{ objectFit: 'cover' }} sizes="480px" />
            </div>
            <div style={{ padding: '20px 24px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '8px' }}>
                {selectedStore.name}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-soft)', marginBottom: '4px' }}>
                📍 {selectedStore.address}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-text-soft)', marginBottom: '4px' }}>
                📅 {selectedStore.openDate} 오픈
              </p>
              <p style={{ fontSize: '13px', color: 'var(--color-text-soft)', marginBottom: '16px' }}>
                📞 {selectedStore.phone}
              </p>
              <button
                onClick={() => setSelectedStore(null)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px',
                  border: '1.5px solid var(--color-border)', background: 'transparent',
                  color: 'var(--color-text-soft)', fontSize: '14px', cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
