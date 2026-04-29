import Image from 'next/image';
import KpiCounter from '@/components/ui/KpiCounter';
import CostTable from '@/components/ui/CostTable';
import OwnerInterviewCard from '@/components/ui/OwnerInterviewCard';
import MenuTabs from '@/components/ui/MenuTabs';
import StoresMap from '@/components/ui/StoresMap';
import GsapScrollReveal from '@/components/ui/GsapScrollReveal';
import FnbContactForm from '../fnb-pure/FnbContactForm';

import siteData from '@/content/site.json';
import kpiData from '@/content/kpi.json';
import costData from '@/content/cost.json';
import ownersData from '@/content/owners.json';
import menuData from '@/content/menu.json';
import storesData from '@/content/stores.json';
import supportData from '@/content/support.json';
import processData from '@/content/process.json';
import eventData from '@/content/event.json';

export const metadata = {
  title: `${siteData.brand} 가맹 모집 | FnB-DYNAMIC 데모`,
  description: siteData.description,
};

const section: React.CSSProperties = {
  padding: '96px 24px',
  maxWidth: '960px',
  margin: '0 auto',
};

const sectionSoft: React.CSSProperties = {
  background: 'var(--color-bg-soft)',
  padding: '96px 24px',
};

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <GsapScrollReveal y={20}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2 style={{
          fontSize: 'clamp(24px, 3.5vw, 36px)',
          fontWeight: '800',
          color: 'var(--color-text)',
          marginBottom: sub ? '10px' : 0,
          letterSpacing: '-0.025em',
          lineHeight: 1.2,
        }}>
          {children}
        </h2>
        {sub && (
          <p style={{ fontSize: '15px', color: 'var(--color-text-soft)', lineHeight: '1.6' }}>{sub}</p>
        )}
      </div>
    </GsapScrollReveal>
  );
}

const SUPPORT_ICONS: Record<string, string> = {
  supply: '🚚', marketing: '📢', education: '🎓',
  pos: '🖥', supervisor: '👤', interior: '🔧', support: '📞',
};

export default function FnbDynamicPage() {
  const regionCounts = storesData.byRegion.map((r) => ({ name: r.name, count: r.count }));

  return (
    <div data-theme="chicken-bold" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'Pretendard, sans-serif' }}>

      {/* ── 01. VIDEO HERO ───────────────────────── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* 배경 영상 — autoPlay muted loop playsInline 필수 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/menu/delicious-juicy-grilled-chicken-meat-bites-with-sa-2026-03-16-03-12-19-utc.jpg"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/cirken-hero-main.mp4" type="video/mp4" />
        </video>

        {/* prefers-reduced-motion 대응 — 영상 숨기고 이미지 표시 */}
        <div className="motion-fallback" style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/menu/delicious-juicy-grilled-chicken-meat-bites-with-sa-2026-03-16-03-12-19-utc.jpg"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', display: 'none' }}
          />
        </div>

        {/* 다크 오버레이 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.25) 100%)',
        }} />

        {/* 카피 */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '0 24px',
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
        }}>
          <GsapScrollReveal y={30}>
            <p style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.50)',
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}>
              Since 2005 · 전국 50개 매장
            </p>
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.08} y={24}>
            <h1 style={{
              fontSize: 'clamp(42px, 6.5vw, 80px)',
              fontWeight: '900',
              color: '#fff',
              lineHeight: '1.08',
              letterSpacing: '-0.04em',
              marginBottom: '20px',
            }}>
              20년, 한 길.<br />
              <span style={{ color: 'var(--color-accent)' }}>사장님과 함께.</span>
            </h1>
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.16} y={20}>
            <p style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              color: 'rgba(255,255,255,0.70)',
              lineHeight: '1.65',
              marginBottom: '40px',
              maxWidth: '400px',
            }}>
              검증된 시스템 · 월 평균 8,000만원<br />
              점주 만족도 96%
            </p>
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.22}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#contact" style={{
                padding: '14px 32px',
                borderRadius: '4px',
                background: 'var(--color-cta)',
                color: '#fff',
                fontSize: '15px', fontWeight: '700', textDecoration: 'none',
                display: 'inline-block',
              }}>
                가맹 문의하기
              </a>
              <a href="#cost" style={{
                padding: '14px 24px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.35)',
                color: '#fff', fontSize: '15px', fontWeight: '600', textDecoration: 'none',
                display: 'inline-block',
              }}>
                창업비 확인 →
              </a>
            </div>
          </GsapScrollReveal>
        </div>

        {/* 스크롤 인디케이터 */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: 0.35,
        }}>
          <span style={{ color: '#fff', fontSize: '10px', letterSpacing: '0.12em' }}>SCROLL</span>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, #fff, transparent)' }} />
        </div>
      </section>

      {/* ── 02. KPI ──────────────────────────────── */}
      <section style={{ background: 'var(--color-bg-soft)', padding: '56px 24px' }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '4px',
        }}>
          {kpiData.items.map((item, i) => (
            <GsapScrollReveal key={item.id} delay={i * 0.07} y={16}>
              <KpiCounter
                value={item.value}
                suffix={item.suffix}
                label={item.label}
                animated={true}
                duration={2000}
              />
            </GsapScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 03. ABOUT ────────────────────────────── */}
      <section style={{ ...section }}>
        <SectionTitle sub="20년의 한 길, 검증된 치킨 프랜차이즈">
          {siteData.brand} 이야기
        </SectionTitle>
        <GsapScrollReveal y={20}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--color-accent)' }}>
                <Image src={siteData.founderPhoto} alt={siteData.founderName} fill style={{ objectFit: 'cover' }} sizes="180px" />
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '4px' }}>{siteData.founderName}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', marginBottom: '16px' }}>설립자 · 대표</div>
              <blockquote style={{ margin: 0, fontSize: '14px', lineHeight: '1.75', color: 'var(--color-text-soft)', fontStyle: 'normal', padding: '16px', background: 'var(--color-bg-soft)', borderRadius: '4px', borderLeft: '3px solid var(--color-accent)' }}>
                {siteData.founderQuote}
              </blockquote>
            </div>
            <div style={{ paddingLeft: '24px', borderLeft: '2px solid var(--color-border)' }}>
              {siteData.history.map((h, i) => (
                <div key={h.year} style={{ marginBottom: i < siteData.history.length - 1 ? '28px' : 0, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-31px', top: '5px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-accent)', marginBottom: '3px', letterSpacing: '0.02em' }}>{h.year}</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.55' }}>{h.event}</div>
                </div>
              ))}
            </div>
          </div>
        </GsapScrollReveal>
      </section>

      {/* ── 04. MENU ─────────────────────────────── */}
      <section style={{ ...sectionSoft }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub="엄선된 재료와 20년 비법 레시피">
            대표 메뉴
          </SectionTitle>
          <GsapScrollReveal y={16}>
            <MenuTabs categories={menuData.categories} />
          </GsapScrollReveal>
        </div>
      </section>

      {/* ── 05. COST ─────────────────────────────── */}
      <section id="cost" style={{ ...section }}>
        <SectionTitle sub="숨겨진 비용 없이 항목별 공개">
          창업 비용
        </SectionTitle>
        <GsapScrollReveal y={16}>
          <CostTable
            baseArea={costData.baseArea}
            items={costData.items}
            total={costData.total}
            disclaimer={costData.disclaimer}
            ctaLabel={costData.ctaLabel}
          />
        </GsapScrollReveal>
      </section>

      {/* ── 06. SUPPORT ──────────────────────────── */}
      <section style={{ ...sectionSoft }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub={supportData.subtitle}>
            {supportData.title}
          </SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {supportData.items.map((item, i) => (
              <GsapScrollReveal key={item.id} delay={i * 0.06} y={12}>
                <div style={{
                  background: 'var(--color-bg)',
                  borderRadius: '6px',
                  padding: '24px 20px',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                  height: '100%',
                }}>
                  <div style={{ fontSize: '26px', marginBottom: '12px' }}>{SUPPORT_ICONS[item.id] ?? '•'}</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.55' }}>{item.description}</div>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07. PROCESS ──────────────────────────── */}
      <section style={{ ...section }}>
        <SectionTitle sub={processData.title}>
          가맹 절차
        </SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
          {processData.steps.map((step, i) => (
            <GsapScrollReveal key={step.id} delay={i * 0.09} y={14}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', fontWeight: '800',
                  margin: '0 auto 16px',
                }}>
                  {step.number}
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '4px' }}>{step.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: '600', marginBottom: '6px' }}>약 {step.duration}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.55' }}>{step.description}</div>
              </div>
            </GsapScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 08. OWNER INTERVIEW ──────────────────── */}
      <section style={{ ...sectionSoft }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub="실제 점주님의 이야기">
            점주 인터뷰
          </SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {ownersData.map((owner, i) => (
              <GsapScrollReveal key={owner.id} delay={i * 0.08} y={16}>
                <OwnerInterviewCard owner={owner} />
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 09. STORES MAP ───────────────────────── */}
      <section style={{ ...section }}>
        <SectionTitle sub="전국 주요 상권에서 cirken을 만나세요">
          전국 매장
        </SectionTitle>
        <GsapScrollReveal y={16}>
          <StoresMap
            stores={storesData.featured}
            regionCounts={regionCounts}
            totalCount={storesData.totalCount}
          />
        </GsapScrollReveal>
      </section>

      {/* ── 10. EVENT BANNER ─────────────────────── */}
      <section style={{ background: 'var(--color-cta)', padding: '72px 24px' }}>
        <GsapScrollReveal y={16}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', marginBottom: '14px', textTransform: 'uppercase' }}>
              무료 가맹 설명회 · {eventData.schedule}
            </p>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: '800', color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
              {eventData.title}
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.70)', marginBottom: '6px' }}>
              {eventData.location}
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.60)', marginBottom: '24px' }}>
              선착순 {eventData.seatsLeft}석 — {eventData.benefits.join(' · ')}
            </p>
            <a href="#contact" style={{
              padding: '13px 36px',
              borderRadius: '4px',
              background: '#fff',
              color: 'var(--color-cta)',
              fontSize: '15px', fontWeight: '700', textDecoration: 'none',
              display: 'inline-block',
            }}>
              설명회 신청하기 →
            </a>
          </div>
        </GsapScrollReveal>
      </section>

      {/* ── 11. CONTACT ──────────────────────────── */}
      <section id="contact" style={{ ...section }}>
        <SectionTitle sub="전담 매니저가 영업일 기준 1~2일 내 연락드립니다">
          가맹 문의
        </SectionTitle>
        <GsapScrollReveal y={16}>
          <FnbContactForm />
        </GsapScrollReveal>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: 'var(--color-bg-soft)',
        borderTop: '1px solid var(--color-border)',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-accent)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
          {siteData.brand}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.8' }}>
          {siteData.address}<br />
          가맹사업 등록번호 {siteData.registrationNumber}<br />
          TEL {siteData.phone} · {siteData.email}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--color-text-soft)', marginTop: '20px', opacity: 0.6 }}>
          © 2025 {siteData.brandFull}. All rights reserved.
        </p>
      </footer>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
          .motion-fallback img { display: block !important; }
        }
      `}</style>
    </div>
  );
}
