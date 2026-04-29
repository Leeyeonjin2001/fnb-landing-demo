'use client';

import { useState } from 'react';

interface FnbFormData {
  name: string;
  phone: string;
  region: string;
  budget: string;
  openTarget: string;
  hasLocation: string;
  experience: string;
  capital: string;
  message: string;
  privacyAgreed: boolean;
}

const REGION_OPTIONS = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '기타'];
const BUDGET_OPTIONS = ['5,000만원 미만', '5,000~8,000만원', '8,000만~1억원', '1억원 이상'];
const OPEN_OPTIONS = ['1개월 이내', '3개월 이내', '6개월 이내', '1년 이내', '아직 미정'];
const EXPERIENCE_OPTIONS = ['창업 경험 없음', '요식업 경험 있음', '프랜차이즈 운영 경험 있음', '기타'];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1.5px solid var(--color-border)',
  background: 'var(--color-bg)',
  color: 'var(--color-text)',
  fontSize: '15px',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: 'var(--color-text-soft)',
  marginBottom: '6px',
};

const EMPTY: FnbFormData = {
  name: '', phone: '', region: '', budget: '', openTarget: '',
  hasLocation: '', experience: '', capital: '', message: '',
  privacyAgreed: false,
};

export default function FnbContactForm() {
  const [form, setForm] = useState<FnbFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FnbFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof FnbFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = '성함을 입력해주세요';
    if (!/^[0-9-]{9,13}$/.test(form.phone.replace(/\s/g, ''))) e.phone = '올바른 연락처를 입력해주세요';
    if (!form.region) e.region = '희망 지역을 선택해주세요';
    if (!form.budget) e.budget = '창업 예산을 선택해주세요';
    if (!form.privacyAgreed) e.privacyAgreed = '개인정보 수집에 동의해주세요';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const inquiry = {
      id: crypto.randomUUID(),
      type: 'fnb_franchise' as const,
      createdAt: new Date().toISOString(),
      status: '신규',
      formData: form,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('fnb_inquiries') || '[]');
      localStorage.setItem('fnb_inquiries', JSON.stringify([inquiry, ...existing]));
    } catch {
      // localStorage unavailable
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{
        maxWidth: '560px', margin: '0 auto',
        textAlign: 'center', padding: '48px 24px',
        background: 'var(--color-bg-soft)',
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-text)', marginBottom: '8px' }}>
          문의가 접수되었습니다
        </h3>
        <p style={{ fontSize: '15px', color: 'var(--color-text-soft)', lineHeight: '1.6', marginBottom: '24px' }}>
          영업일 기준 1~2일 내로 전담 매니저가<br />연락드리겠습니다.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setSubmitted(false); }}
          style={{
            padding: '12px 28px', borderRadius: '8px',
            border: '1.5px solid var(--color-border)',
            background: 'transparent', color: 'var(--color-text-soft)',
            fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          다시 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: '560px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* 성함 */}
        <div>
          <label style={labelStyle}>성함 *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="홍길동"
            style={{ ...inputStyle, borderColor: errors.name ? '#E85D2A' : 'var(--color-border)' }}
          />
          {errors.name && <p style={{ fontSize: '12px', color: '#E85D2A', marginTop: '4px' }}>{errors.name}</p>}
        </div>

        {/* 연락처 */}
        <div>
          <label style={labelStyle}>연락처 *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="010-0000-0000"
            style={{ ...inputStyle, borderColor: errors.phone ? '#E85D2A' : 'var(--color-border)' }}
          />
          {errors.phone && <p style={{ fontSize: '12px', color: '#E85D2A', marginTop: '4px' }}>{errors.phone}</p>}
        </div>

        {/* 희망 지역 */}
        <div>
          <label style={labelStyle}>희망 창업 지역 *</label>
          <select
            value={form.region}
            onChange={(e) => set('region', e.target.value)}
            style={{ ...inputStyle, borderColor: errors.region ? '#E85D2A' : 'var(--color-border)' }}
          >
            <option value="">선택</option>
            {REGION_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.region && <p style={{ fontSize: '12px', color: '#E85D2A', marginTop: '4px' }}>{errors.region}</p>}
        </div>

        {/* 창업 예산 */}
        <div>
          <label style={labelStyle}>창업 예산 *</label>
          <select
            value={form.budget}
            onChange={(e) => set('budget', e.target.value)}
            style={{ ...inputStyle, borderColor: errors.budget ? '#E85D2A' : 'var(--color-border)' }}
          >
            <option value="">선택</option>
            {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.budget && <p style={{ fontSize: '12px', color: '#E85D2A', marginTop: '4px' }}>{errors.budget}</p>}
        </div>

        {/* 오픈 목표 */}
        <div>
          <label style={labelStyle}>오픈 목표 시기</label>
          <select
            value={form.openTarget}
            onChange={(e) => set('openTarget', e.target.value)}
            style={inputStyle}
          >
            <option value="">선택</option>
            {OPEN_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* 상권 확보 여부 */}
        <div>
          <label style={labelStyle}>상권/자리 확보 여부</label>
          <select
            value={form.hasLocation}
            onChange={(e) => set('hasLocation', e.target.value)}
            style={inputStyle}
          >
            <option value="">선택</option>
            <option value="확보됨">확보됨</option>
            <option value="알아보는 중">알아보는 중</option>
            <option value="미정">미정</option>
          </select>
        </div>

        {/* 창업 경험 */}
        <div>
          <label style={labelStyle}>창업 경험</label>
          <select
            value={form.experience}
            onChange={(e) => set('experience', e.target.value)}
            style={inputStyle}
          >
            <option value="">선택</option>
            {EXPERIENCE_OPTIONS.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>

        {/* 보유 자본 */}
        <div>
          <label style={labelStyle}>보유 자본</label>
          <input
            type="text"
            value={form.capital}
            onChange={(e) => set('capital', e.target.value)}
            placeholder="약 1억원"
            style={inputStyle}
          />
        </div>
      </div>

      {/* 추가 메시지 */}
      <div style={{ marginTop: '16px' }}>
        <label style={labelStyle}>추가 문의사항</label>
        <textarea
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          rows={4}
          placeholder="궁금하신 점이나 특이사항을 자유롭게 적어주세요."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* 개인정보 동의 */}
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <input
          type="checkbox"
          id="privacy"
          checked={form.privacyAgreed}
          onChange={(e) => set('privacyAgreed', e.target.checked)}
          style={{ marginTop: '2px', accentColor: 'var(--color-accent)', width: '16px', height: '16px', flexShrink: 0 }}
        />
        <label htmlFor="privacy" style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.5', cursor: 'pointer' }}>
          개인정보 수집 및 이용에 동의합니다. (성명, 연락처를 가맹 상담 목적으로 수집·이용)
        </label>
      </div>
      {errors.privacyAgreed && <p style={{ fontSize: '12px', color: '#E85D2A', marginTop: '4px' }}>{errors.privacyAgreed}</p>}

      {/* 제출 버튼 */}
      <button
        type="submit"
        style={{
          width: '100%',
          marginTop: '24px',
          padding: '16px',
          borderRadius: '10px',
          border: 'none',
          background: 'var(--color-cta)',
          color: 'var(--color-cta-text, #fff)',
          fontSize: '17px',
          fontWeight: '800',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        가맹 문의 신청하기 →
      </button>
    </form>
  );
}
