'use client';

import { useState } from 'react';
import { TelephoneFill, EnvelopeFill, GeoAltFill, ChatDotsFill, CheckCircleFill, ArrowClockwise } from 'react-bootstrap-icons';
import InquiryConfirmModal from '@/components/ui/InquiryConfirmModal';

const SPACE_TYPES = ['주거', '카페', '사무실', '상가', '병원', '직접 입력'];

interface ContactSectionProps {
  phone?: string;
  email?: string;
  address?: string;
  kakaoUrl?: string;
}

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

const INITIAL: FormData = {
  name: '', phone: '', address: '', desiredDate: '',
  area: '', budget: '', spaceType: '', customSpaceType: '',
  message: '', privacyAgreed: false, _honeypot: '',
};

export default function ContactSection({
  phone = '010-1234-5678',
  email = 'contact@oo-interior.com',
  address = '서울시 강남구 테헤란로 123',
  kakaoUrl = '#',
}: ContactSectionProps) {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showConfirm, setShowConfirm] = useState(false);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = '성함을 입력해 주세요';
    if (!form.phone.trim()) e.phone = '연락처를 입력해 주세요';
    else if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(form.phone.replace(/-/g, ''))) e.phone = '올바른 전화번호 형식으로 입력해 주세요';
    if (!form.spaceType) e.spaceType = '공간 유형을 선택해 주세요';
    if (!form.privacyAgreed) e.privacyAgreed = '개인정보 수집에 동의해 주세요';
    return e;
  };

  // 검증만 통과 → 확인 모달
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form._honeypot) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setShowConfirm(true);
  };

  // 모달에서 [신청하기] 클릭 → 실제 제출
  const handleConfirm = async () => {
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1000));
    const inquiries = JSON.parse(localStorage.getItem('demo_inquiries') || '[]');
    inquiries.push({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    localStorage.setItem('demo_inquiries', JSON.stringify(inquiries));
    console.log('[DEMO] 폼 제출 확정:', form);
    setShowConfirm(false);
    setStatus('success');
  };

  // 모달에서 [수정하기] 클릭 → 폼 값 유지, 모달만 닫기
  const handleEdit = () => setShowConfirm(false);

  const inputStyle = (error?: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 14px',
    border: `1px solid ${error ? '#e53e3e' : 'var(--color-border)'}`,
    borderRadius: '8px',
    fontSize: '15px',
    color: 'var(--color-text)',
    background: 'var(--color-bg)',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
  });

  return (
    <>
    <InquiryConfirmModal
      isOpen={showConfirm}
      formData={form}
      isSubmitting={status === 'loading'}
      onConfirm={handleConfirm}
      onEdit={handleEdit}
    />
    <section id="contact" style={{ padding: '96px 24px', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ color: 'var(--color-accent)', fontSize: '13px', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '12px' }}>CONTACT</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            무료 견적 문의
          </h2>
          <p style={{ color: 'var(--color-text-soft)', fontSize: '16px' }}>
            24시간 내 답변 드립니다
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}
          className="contact-grid">

          {/* 폼 */}
          <div>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', border: '1px solid var(--color-border)', borderRadius: '16px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px', color: 'var(--color-accent)', display: 'flex', justifyContent: 'center' }}>
                  <CheckCircleFill size={64} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '12px' }}>
                  문의가 접수되었습니다!
                </h3>
                <p style={{ color: 'var(--color-text-soft)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                  24시간 내에 연락드리겠습니다.<br />카카오톡 채널을 추가하시면 더 빠르게 답변 받으실 수 있어요.
                </p>
                <a href={kakaoUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-block', background: '#FEE500', color: '#000', borderRadius: '8px', padding: '12px 24px', fontWeight: '600', textDecoration: 'none', fontSize: '15px' }}>
                  카카오톡 채널 추가 →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* 허니팟 (봇 차단) */}
                <div style={{ display: 'none' }}>
                  <input tabIndex={-1} value={form._honeypot} onChange={(e) => set('_honeypot', e.target.value)} autoComplete="off" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '6px' }}>
                      성함 <span style={{ color: '#e53e3e' }}>*</span>
                    </label>
                    <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="홍길동" style={inputStyle(errors.name)} />
                    {errors.name && <p style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '6px' }}>
                      연락처 <span style={{ color: '#e53e3e' }}>*</span>
                    </label>
                    <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="010-1234-5678" type="tel" style={inputStyle(errors.phone)} />
                    {errors.phone && <p style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '6px' }}>상세 주소</label>
                  <input value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="서울시 강남구 ..." style={inputStyle()} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '6px' }}>희망 공사일</label>
                    <input type="date" value={form.desiredDate} onChange={(e) => set('desiredDate', e.target.value)} style={inputStyle()} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '6px' }}>평수</label>
                    <input value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="33평" style={inputStyle()} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '6px' }}>예산</label>
                    <input value={form.budget} onChange={(e) => set('budget', e.target.value)} placeholder="5000만원대" style={inputStyle()} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '8px' }}>
                    공간 유형 <span style={{ color: '#e53e3e' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {SPACE_TYPES.map((t) => (
                      <button key={t} type="button"
                        onClick={() => set('spaceType', t)}
                        style={{
                          padding: '8px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
                          background: form.spaceType === t ? 'var(--color-cta)' : 'var(--color-bg-soft)',
                          color: form.spaceType === t ? 'var(--color-cta-text)' : 'var(--color-text-soft)',
                          border: `1px solid ${form.spaceType === t ? 'var(--color-cta)' : 'var(--color-border)'}`,
                        }}>
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.spaceType && <p style={{ color: '#e53e3e', fontSize: '12px', marginTop: '6px' }}>{errors.spaceType}</p>}
                  {form.spaceType === '직접 입력' && (
                    <input value={form.customSpaceType} onChange={(e) => set('customSpaceType', e.target.value)}
                      placeholder="공간 유형 입력" style={{ ...inputStyle(), marginTop: '8px' }} />
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', marginBottom: '6px' }}>상세 내용</label>
                  <textarea value={form.message} onChange={(e) => set('message', e.target.value)}
                    placeholder="시공 범위, 요청사항 등 자유롭게 적어주세요"
                    rows={4}
                    style={{ ...inputStyle(), resize: 'vertical' }} />
                </div>

                <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input type="checkbox" id="privacy" checked={form.privacyAgreed}
                    onChange={(e) => set('privacyAgreed', e.target.checked)}
                    style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: 'var(--color-cta)' }} />
                  <label htmlFor="privacy" style={{ fontSize: '13px', color: 'var(--color-text-soft)', cursor: 'pointer', lineHeight: '1.5' }}>
                    개인정보 수집 및 이용에 동의합니다. <span style={{ color: '#e53e3e' }}>*</span>
                  </label>
                </div>
                {errors.privacyAgreed && <p style={{ color: '#e53e3e', fontSize: '12px', marginBottom: '12px' }}>{errors.privacyAgreed}</p>}

                <button type="submit"
                  style={{
                    width: '100%', padding: '16px', borderRadius: '10px',
                    background: 'var(--color-cta)',
                    color: 'var(--color-cta-text)', border: 'none',
                    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                    fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}>
                  상담 신청하기
                </button>
              </form>
            )}
          </div>

          {/* 연락처 정보 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { label: '전화', value: phone, href: `tel:${phone.replace(/-/g, '')}`, icon: <TelephoneFill size={20} /> },
              { label: '이메일', value: email, href: `mailto:${email}`, icon: <EnvelopeFill size={20} /> },
              { label: '주소', value: address, href: undefined, icon: <GeoAltFill size={20} /> },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-soft)', marginBottom: '4px' }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text)', textDecoration: 'none' }}>{item.value}</a>
                  ) : (
                    <p style={{ fontSize: '15px', color: 'var(--color-text)', margin: 0 }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a href={kakaoUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#FEE500', color: '#000', borderRadius: '10px', padding: '16px', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>
              <ChatDotsFill size={20} /> 카카오톡으로 문의하기
            </a>

            {/* 시공 가능 지역 */}
            <div style={{ background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '12px' }}>시공 가능 지역</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['강남구', '서초구', '송파구', '분당구', '수도권 전체'].map((area) => (
                  <span key={area} style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '4px 12px', fontSize: '13px', color: 'var(--color-text-soft)' }}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
    </>
  );
}
