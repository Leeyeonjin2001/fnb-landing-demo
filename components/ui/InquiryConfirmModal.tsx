'use client';

import { useEffect } from 'react';
import { XLg } from 'react-bootstrap-icons';

interface FormData {
  name: string;
  phone: string;
  address: string;
  desiredDate: string;
  area: string;
  budget: string;
  spaceType: string;
  customSpaceType: string;
  message: string;
  privacyAgreed: boolean;
  _honeypot: string;
}

interface InquiryConfirmModalProps {
  isOpen: boolean;
  formData: FormData;
  isSubmitting: boolean;
  onConfirm: () => void;
  onEdit: () => void;
}

const FIELD_LABELS: Array<{ key: keyof FormData; label: string }> = [
  { key: 'name', label: '성함' },
  { key: 'phone', label: '연락처' },
  { key: 'address', label: '상세 주소' },
  { key: 'desiredDate', label: '희망 공사일' },
  { key: 'area', label: '평수' },
  { key: 'budget', label: '예산' },
  { key: 'spaceType', label: '공간 유형' },
  { key: 'message', label: '상세 내용' },
];

function displayValue(key: keyof FormData, formData: FormData): string {
  if (key === 'spaceType' && formData.spaceType === '직접 입력') {
    return formData.customSpaceType || '—';
  }
  const val = formData[key];
  if (typeof val === 'boolean') return val ? '동의' : '미동의';
  return (val as string).trim() || '—';
}

export default function InquiryConfirmModal({
  isOpen,
  formData,
  isSubmitting,
  onConfirm,
  onEdit,
}: InquiryConfirmModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onEdit(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onEdit]);

  // 모달 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={onEdit}
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
          borderRadius: '20px',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 헤더 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 24px 0',
          flexShrink: 0,
        }}>
          <div>
            <h3 id="confirm-modal-title" style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '4px' }}>
              입력 내용 확인
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-soft)' }}>
              아래 내용으로 신청하시겠습니까?
            </p>
          </div>
          <button
            onClick={onEdit}
            aria-label="닫기"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-text-soft)', padding: '4px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <XLg size={20} />
          </button>
        </div>

        {/* 구분선 */}
        <div style={{ height: '1px', background: 'var(--color-border)', margin: '20px 24px 0' }} />

        {/* 내용 */}
        <div style={{ padding: '16px 24px', flex: 1 }}>
          {FIELD_LABELS.map(({ key, label }) => {
            const value = displayValue(key, formData);
            const isEmpty = value === '—';
            return (
              <div key={key} style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '8px',
                padding: '10px 0',
                borderBottom: '1px solid var(--color-border)',
                alignItems: key === 'message' ? 'flex-start' : 'center',
              }}>
                <span style={{ fontSize: '13px', color: 'var(--color-text-soft)', fontWeight: '500' }}>
                  {label}
                </span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: isEmpty ? '400' : '600',
                  color: isEmpty ? 'var(--color-text-soft)' : 'var(--color-text)',
                  wordBreak: 'break-word',
                  whiteSpace: key === 'message' ? 'pre-wrap' : 'normal',
                }}>
                  {value}
                </span>
              </div>
            );
          })}

          {/* 개인정보 동의 */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 0 0',
            color: formData.privacyAgreed ? 'var(--color-accent)' : 'var(--color-text-soft)',
            fontSize: '13px', fontWeight: '600',
          }}>
            <span style={{
              width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
              background: formData.privacyAgreed ? 'var(--color-accent)' : 'var(--color-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '11px',
            }}>
              {formData.privacyAgreed ? '✓' : ''}
            </span>
            개인정보 수집 및 이용에 동의합니다
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ height: '1px', background: 'var(--color-border)', margin: '0 24px' }} />

        {/* 하단 버튼 */}
        <div style={{
          display: 'flex', gap: '12px',
          padding: '20px 24px 24px',
          flexShrink: 0,
        }}>
          <button
            onClick={onEdit}
            disabled={isSubmitting}
            style={{
              flex: 1, padding: '14px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-text-soft)',
              fontSize: '15px', fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            수정하기
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            style={{
              flex: 2, padding: '14px',
              borderRadius: '10px',
              border: 'none',
              background: isSubmitting ? 'var(--color-border)' : 'var(--color-cta)',
              color: 'var(--color-cta-text, #fff)',
              fontSize: '15px', fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            {isSubmitting
              ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-flex' }}>↻</span> 제출 중...</>
              : '신청하기 →'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
