import { Headset, Rulers, Hammer, ShieldCheck, ChevronRight } from 'react-bootstrap-icons';
import type { ReactNode } from 'react';

interface Step {
  icon: ReactNode;
  title: string;
  desc: string;
  num: string;
}

const STEPS: Step[] = [
  { icon: <Headset size={32} />, title: '무료 상담', desc: '전화·카톡·방문\n무료 상담 진행', num: '01' },
  { icon: <Rulers size={32} />, title: '3D 설계', desc: '3D 도면 작성 후\n사전 시뮬레이션', num: '02' },
  { icon: <Hammer size={32} />, title: '시공', desc: '숙련 기사 투입\n현장 점검 매일', num: '03' },
  { icon: <ShieldCheck size={32} />, title: '1년 A/S', desc: '시공 후 1년\n무상 A/S 보장', num: '04' },
];

interface ProcessSectionProps {
  useLottie?: boolean;
}

export default function ProcessSection({ useLottie = false }: ProcessSectionProps) {
  return (
    <section id="process" style={{ padding: '96px 24px', background: 'var(--color-bg-soft)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: 'var(--color-accent)', fontSize: '13px', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '12px' }}>
            PROCESS
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            시공 과정
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          position: 'relative',
        }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ textAlign: 'center', position: 'relative' }}>
              {/* 연결 화살표 (마지막 제외, 데스크탑) */}
              {i < STEPS.length - 1 && (
                <div className="process-arrow" style={{
                  position: 'absolute',
                  top: '24px',
                  right: '-20px',
                  color: 'var(--color-accent)',
                  opacity: 0.4,
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <ChevronRight size={20} />
                </div>
              )}

              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'var(--color-bg)',
                border: '2px solid var(--color-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--color-accent)',
                position: 'relative',
              }}>
                {step.icon}
                <span style={{
                  position: 'absolute',
                  top: '-8px', right: '-8px',
                  width: '24px', height: '24px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  color: 'var(--color-cta-text)',
                  fontSize: '10px',
                  fontWeight: '700',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {step.num}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '12px' }}>
                {step.title}
              </h3>
              <p style={{ color: 'var(--color-text-soft)', fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .process-arrow { display: none !important; } }
      `}</style>
    </section>
  );
}
