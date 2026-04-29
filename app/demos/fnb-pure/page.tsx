import Image from 'next/image';
import KpiCounter from '@/components/ui/KpiCounter';
import CostTable from '@/components/ui/CostTable';
import OwnerInterviewCard from '@/components/ui/OwnerInterviewCard';
import MenuTabs from '@/components/ui/MenuTabs';
import StoresMap from '@/components/ui/StoresMap';
import FnbContactForm from './FnbContactForm';

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
  title: `${siteData.brand} 가맹 모집 | FnB-PURE 데모`,
  description: siteData.description,
};

const sectionBase: React.CSSProperties = {
  padding: '80px 24px',
  maxWidth: '960px',
  margin: '0 auto',
};

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h2 style={{
        fontSize: 'clamp(26px, 4vw, 40px)',
        fontWeight: '800',
        color: 'var(--color-text)',
        marginBottom: sub ? '12px' : 0,
        letterSpacing: '-0.02em',
      }}>
        {children}
      </h2>
      {sub && (
        <p style={{ fontSize: '16px', color: 'var(--color-text-soft)', lineHeight: '1.6' }}>{sub}</p>
      )}
    </div>
  );
}

export default function FnbPurePage() {
  const regionCounts = storesData.byRegion.map((r) => ({ name: r.name, count: r.count }));

  return (
    <div data-theme="chicken-warm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'Pretendard, sans-serif' }}>

      {/* ── 01. HERO ─────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #2A1810 0%, #E85D2A 60%, #C73E0F 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '80px 24px',
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
        }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 16px', marginBottom: '20px' }}>
            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>🍗 전국 50개 매장 운영 중</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: '900',
            color: '#fff',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}>
            사장님과 함께<br />성공하는 브랜드
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', marginBottom: '36px', maxWidth: '520px' }}>
            20년 노하우로 검증된 치킨 프랜차이즈.<br />
            평균 월 매출 8,000만원, 점주 만족도 96%.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#contact" style={{
              padding: '16px 36px', borderRadius: '8px',
              background: '#fff', color: '#E85D2A',
              fontSize: '16px', fontWeight: '800', textDecoration: 'none',
              display: 'inline-block',
            }}>
              가맹 문의하기
            </a>
            <a href="#cost" style={{
              padding: '16px 28px', borderRadius: '8px',
              border: '2px solid rgba(255,255,255,0.6)',
              color: '#fff', fontSize: '16px', fontWeight: '700', textDecoration: 'none',
              display: 'inline-block',
            }}>
              창업비 확인 →
            </a>
          </div>
        </div>
      </section>

      {/* ── 02. KPI ──────────────────────────────── */}
      <section style={{ background: 'var(--color-bg-soft)', padding: '60px 24px' }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
        }}>
          {kpiData.items.map((item) => (
            <KpiCounter
              key={item.id}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              animated={false}
            />
          ))}
        </div>
      </section>

      {/* ── 03. ABOUT / 브랜드 스토리 ───────────── */}
      <section style={{ ...sectionBase }}>
        <SectionTitle sub="20년의 한 길, 검증된 치킨 프랜차이즈">
          {siteData.brand} 이야기
        </SectionTitle>
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
      </section>

      {/* ── 04. MENU ─────────────────────────────── */}
      <section style={{ background: 'var(--color-bg-soft)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub="엄선된 재료와 20년 비법 레시피">
            대표 메뉴
          </SectionTitle>
          <MenuTabs categories={menuData.categories} />
        </div>
      </section>

      {/* ── 05. COST ─────────────────────────────── */}
      <section id="cost" style={{ ...sectionBase }}>
        <SectionTitle sub="숨겨진 비용 없이 투명하게 공개합니다">
          창업 비용
        </SectionTitle>
        <CostTable
          baseArea={costData.baseArea}
          items={costData.items}
          total={costData.total}
          disclaimer={costData.disclaimer}
          ctaLabel={costData.ctaLabel}
        />
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
            {supportData.items.map((item) => (
              <div key={item.id} style={{
                background: 'var(--color-bg)',
                borderRadius: '14px',
                padding: '24px 20px',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
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
          {processData.steps.map((step) => (
            <div key={step.id} style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px', height: '64px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                color: 'var(--color-cta-text, #fff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', fontWeight: '800',
                margin: '0 auto 16px',
              }}>
                {step.number}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '4px' }}>{step.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: '600', marginBottom: '6px' }}>약 {step.duration}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.5' }}>{step.description}</div>
            </div>
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
            {ownersData.map((owner) => (
              <OwnerInterviewCard key={owner.id} owner={owner} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 09. STORES MAP ───────────────────────── */}
      <section style={{ ...sectionBase }}>
        <SectionTitle sub="전국 주요 상권에서 cirken을 만나세요">
          전국 매장
        </SectionTitle>
        <StoresMap
          stores={storesData.featured}
          regionCounts={regionCounts}
          totalCount={storesData.totalCount}
        />
      </section>

      {/* ── 10. EVENT BANNER ─────────────────────── */}
      <section style={{ background: 'var(--color-accent)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: '12px', letterSpacing: '0.08em' }}>
            📅 {eventData.schedule}
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '800', color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            {eventData.title}
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '8px' }}>
            📍 {eventData.location}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '28px' }}>
            선착순 {eventData.seatsLeft}석 — 참석 혜택: {eventData.benefits.join(' · ')}
          </p>
          <a href="#contact" style={{
            padding: '14px 40px',
            borderRadius: '8px',
            background: '#fff',
            color: '#E85D2A',
            fontSize: '16px',
            fontWeight: '800',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            설명회 신청하기 →
          </a>
        </div>
      </section>

      {/* ── 11. CONTACT ──────────────────────────── */}
      <section id="contact" style={{ ...sectionBase }}>
        <SectionTitle sub="지금 바로 문의하시면 전담 매니저가 연락드립니다">
          가맹 문의
        </SectionTitle>
        <FnbContactForm />
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
