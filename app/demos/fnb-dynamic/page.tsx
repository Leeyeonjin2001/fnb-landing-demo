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

const sectionBase: React.CSSProperties = {
  padding: '80px 24px',
  maxWidth: '960px',
  margin: '0 auto',
};

function SectionTitle({ children, sub, light }: { children: React.ReactNode; sub?: string; light?: boolean }) {
  return (
    <GsapScrollReveal>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{
          fontSize: 'clamp(26px, 4vw, 40px)',
          fontWeight: '800',
          color: light ? '#fff' : 'var(--color-text)',
          marginBottom: sub ? '12px' : 0,
          letterSpacing: '-0.02em',
        }}>
          {children}
        </h2>
        {sub && (
          <p style={{ fontSize: '16px', color: light ? 'rgba(255,255,255,0.75)' : 'var(--color-text-soft)', lineHeight: '1.6' }}>{sub}</p>
        )}
      </div>
    </GsapScrollReveal>
  );
}

export default function FnbDynamicPage() {
  const regionCounts = storesData.byRegion.map((r) => ({ name: r.name, count: r.count }));

  return (
    <div data-theme="chicken-bold" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'Pretendard, sans-serif' }}>

      {/* ── 01. VIDEO HERO ───────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* 영상 없을 때 배경 대체 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0A0500 0%, #1A0F0A 40%, #2D1208 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(232,93,42,0.25) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(212,165,60,0.15) 0%, transparent 45%)
          `,
        }} />

        {/* 헤드라인 */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '80px 24px',
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
        }}>
          <GsapScrollReveal y={60}>
            <div style={{ display: 'inline-block', background: 'rgba(232,93,42,0.3)', border: '1px solid rgba(232,93,42,0.6)', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px' }}>
              <span style={{ color: '#E85D2A', fontSize: '13px', fontWeight: '700', letterSpacing: '0.05em' }}>🍗 SINCE 2005 · 전국 50개 매장</span>
            </div>
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.1} y={50}>
            <h1 style={{
              fontSize: 'clamp(42px, 7vw, 88px)',
              fontWeight: '900',
              color: '#fff',
              lineHeight: '1.1',
              letterSpacing: '-0.04em',
              marginBottom: '24px',
            }}>
              치킨으로<br /><span style={{ color: '#D4A53C' }}>성공</span>하세요
            </h1>
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.2} y={40}>
            <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '40px', maxWidth: '480px' }}>
              20년 검증된 레시피 · 매일 새벽 신선 배송<br />
              평균 월 매출 8,000만원
            </p>
          </GsapScrollReveal>
          <GsapScrollReveal delay={0.3}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#contact" style={{
                padding: '18px 40px', borderRadius: '8px',
                background: '#E85D2A', color: '#fff',
                fontSize: '17px', fontWeight: '800', textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 8px 32px rgba(232,93,42,0.5)',
              }}>
                가맹 문의하기
              </a>
              <a href="#cost" style={{
                padding: '18px 28px', borderRadius: '8px',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff', fontSize: '17px', fontWeight: '700', textDecoration: 'none',
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
          opacity: 0.5,
        }}>
          <span style={{ color: '#fff', fontSize: '11px', letterSpacing: '0.1em' }}>SCROLL</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #fff, transparent)' }} />
        </div>
      </section>

      {/* ── 02. KPI (애니메이션 카운터) ─────────── */}
      <section style={{ background: 'var(--color-bg-soft)', padding: '64px 24px' }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
        }}>
          {kpiData.items.map((item, i) => (
            <GsapScrollReveal key={item.id} delay={i * 0.08}>
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

      {/* ── 03. BRAND STORY ──────────────────────── */}
      <section style={{ ...sectionBase }}>
        <SectionTitle sub="20년의 한 길, 검증된 치킨 프랜차이즈">
          {siteData.brand} 이야기
        </SectionTitle>
        <GsapScrollReveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--color-accent)' }}>
                <Image src={siteData.founderPhoto} alt={siteData.founderName} fill style={{ objectFit: 'cover' }} sizes="200px" />
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '4px' }}>{siteData.founderName}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', marginBottom: '16px' }}>설립자 · 대표</div>
              <blockquote style={{ margin: 0, fontSize: '14px', lineHeight: '1.7', color: 'var(--color-text-soft)', fontStyle: 'italic', padding: '0 8px' }}>
                &ldquo;{siteData.founderQuote}&rdquo;
              </blockquote>
            </div>
            <div>
              <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--color-accent)' }}>
                {siteData.history.map((h, i) => (
                  <div key={h.year} style={{ marginBottom: i < siteData.history.length - 1 ? '24px' : 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-accent)' }} />
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-accent)', marginBottom: '2px' }}>{h.year}</div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.5' }}>{h.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GsapScrollReveal>
      </section>

      {/* ── 04. MENU ─────────────────────────────── */}
      <section style={{ background: 'var(--color-bg-soft)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub="엄선된 재료와 20년 비법 레시피">
            대표 메뉴
          </SectionTitle>
          <GsapScrollReveal>
            <MenuTabs categories={menuData.categories} />
          </GsapScrollReveal>
        </div>
      </section>

      {/* ── 05. COST ─────────────────────────────── */}
      <section id="cost" style={{ ...sectionBase }}>
        <SectionTitle sub="숨겨진 비용 없이 투명하게 공개합니다">
          창업 비용
        </SectionTitle>
        <GsapScrollReveal>
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
      <section style={{ background: 'var(--color-bg-soft)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub={supportData.subtitle}>
            {supportData.title}
          </SectionTitle>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {supportData.items.map((item, i) => (
              <GsapScrollReveal key={item.id} delay={i * 0.07}>
                <div style={{
                  background: 'var(--color-bg)',
                  borderRadius: '14px',
                  padding: '24px 20px',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                  height: '100%',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                    {item.id === 'supply' && '🚚'}
                    {item.id === 'marketing' && '📢'}
                    {item.id === 'education' && '🎓'}
                    {item.id === 'pos' && '🖥'}
                    {item.id === 'supervisor' && '👨‍💼'}
                    {item.id === 'interior' && '🔧'}
                    {item.id === 'support' && '📞'}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.5' }}>{item.description}</div>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07. PROCESS ──────────────────────────── */}
      <section style={{ ...sectionBase }}>
        <SectionTitle sub={processData.title}>
          가맹 절차
        </SectionTitle>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
        }}>
          {processData.steps.map((step, i) => (
            <GsapScrollReveal key={step.id} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  color: 'var(--color-cta-text, #fff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', fontWeight: '800',
                  margin: '0 auto 16px',
                  boxShadow: '0 4px 16px rgba(232,93,42,0.4)',
                }}>
                  {step.number}
                </div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '4px' }}>{step.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: '600', marginBottom: '6px' }}>약 {step.duration}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.5' }}>{step.description}</div>
              </div>
            </GsapScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 08. OWNER INTERVIEW ──────────────────── */}
      <section style={{ background: 'var(--color-bg-soft)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub="실제 점주님의 이야기를 들어보세요">
            점주 인터뷰
          </SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {ownersData.map((owner, i) => (
              <GsapScrollReveal key={owner.id} delay={i * 0.1}>
                <OwnerInterviewCard owner={owner} />
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 09. STORES MAP ───────────────────────── */}
      <section style={{ ...sectionBase }}>
        <SectionTitle sub="전국 주요 상권에서 cirken을 만나세요">
          전국 매장
        </SectionTitle>
        <GsapScrollReveal>
          <StoresMap
            stores={storesData.featured}
            regionCounts={regionCounts}
            totalCount={storesData.totalCount}
          />
        </GsapScrollReveal>
      </section>

      {/* ── 10. EVENT BANNER ─────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-accent) 0%, #C73E0F 100%)',
        padding: '64px 24px',
      }}>
        <GsapScrollReveal>
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '700', marginBottom: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              📅 {eventData.schedule}
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '900', color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              {eventData.title}
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>📍 {eventData.location}</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '12px' }}>
              선착순 {eventData.seatsLeft}석
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '28px' }}>
              {eventData.benefits.map((b) => (
                <span key={b} style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  color: '#fff',
                  fontWeight: '600',
                }}>
                  🎁 {b}
                </span>
              ))}
            </div>
            <a href="#contact" style={{
              padding: '16px 48px',
              borderRadius: '8px',
              background: '#fff',
              color: '#E85D2A',
              fontSize: '17px',
              fontWeight: '800',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}>
              설명회 신청하기 →
            </a>
          </div>
        </GsapScrollReveal>
      </section>

      {/* ── 11. CONTACT ──────────────────────────── */}
      <section id="contact" style={{ ...sectionBase }}>
        <SectionTitle sub="지금 바로 문의하시면 전담 매니저가 연락드립니다">
          가맹 문의
        </SectionTitle>
        <GsapScrollReveal>
          <FnbContactForm />
        </GsapScrollReveal>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: 'var(--color-bg-soft)',
        borderTop: '1px solid var(--color-border)',
        padding: '32px 24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-accent)', marginBottom: '8px' }}>
          {siteData.brand}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.7' }}>
          {siteData.address}<br />
          가맹사업 등록번호 {siteData.registrationNumber}<br />
          TEL {siteData.phone} · {siteData.email}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--color-text-soft)', marginTop: '16px' }}>
          © 2025 {siteData.brandFull}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
