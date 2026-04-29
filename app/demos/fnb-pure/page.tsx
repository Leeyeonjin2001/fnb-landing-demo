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

// 절제된 섹션 여백 — 96px (모바일 60px)
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
  );
}

// 지원 항목 아이콘 맵
const SUPPORT_ICONS: Record<string, string> = {
  supply: '🚚', marketing: '📢', education: '🎓',
  pos: '🖥', supervisor: '👤', interior: '🔧', support: '📞',
};

export default function FnbPurePage() {
  const regionCounts = storesData.byRegion.map((r) => ({ name: r.name, count: r.count }));

  return (
    <div data-theme="chicken-warm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'Pretendard, sans-serif' }}>

      {/* ── 01. HERO — 풀스크린 사진 배경 ──────── */}
      <section style={{ position: 'relative', height: '92vh', minHeight: '560px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* 배경 사진 */}
        <Image
          src="/images/menu/delicious-juicy-grilled-chicken-meat-bites-with-sa-2026-03-16-03-12-19-utc.jpg"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
        {/* 다크 오버레이 — 좌측 강하게, 우측 약하게 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.20) 100%)',
        }} />

        {/* 카피 */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '0 24px',
          maxWidth: '960px',
          margin: '0 auto',
          width: '100%',
        }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '20px',
            textTransform: 'uppercase',
          }}>
            Since 2005 · 전국 50개 매장
          </p>
          <h1 style={{
            fontSize: 'clamp(38px, 5.5vw, 68px)',
            fontWeight: '900',
            color: '#fff',
            lineHeight: '1.12',
            letterSpacing: '-0.035em',
            marginBottom: '20px',
          }}>
            20년, 한 길.<br />사장님과 함께.
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'rgba(255,255,255,0.80)',
            lineHeight: '1.65',
            marginBottom: '40px',
            maxWidth: '440px',
          }}>
            검증된 시스템 · 월 평균 8,000만원<br />
            점주 만족도 96%
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#contact" style={{
              padding: '14px 32px',
              borderRadius: '4px',
              background: 'var(--color-cta)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              가맹 문의하기
            </a>
            <a href="#cost" style={{
              padding: '14px 24px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.50)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              창업비 확인 →
            </a>
          </div>
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

      {/* ── 03. ABOUT ────────────────────────────── */}
      <section style={{ ...section }}>
        <SectionTitle sub="20년의 한 길, 검증된 치킨 프랜차이즈">
          {siteData.brand} 이야기
        </SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 20px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--color-accent)' }}>
              <Image src={siteData.founderPhoto} alt={siteData.founderName} fill style={{ objectFit: 'cover' }} sizes="180px" />
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '4px' }}>{siteData.founderName}</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', marginBottom: '16px' }}>설립자 · 대표</div>
            <blockquote style={{ margin: 0, fontSize: '14px', lineHeight: '1.75', color: 'var(--color-text-soft)', fontStyle: 'normal', padding: '16px', background: 'var(--color-bg-soft)', borderRadius: '6px', borderLeft: '3px solid var(--color-accent)' }}>
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
      </section>

      {/* ── 04. MENU ─────────────────────────────── */}
      <section style={{ ...sectionSoft }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub="엄선된 재료와 20년 비법 레시피">
            대표 메뉴
          </SectionTitle>
          <MenuTabs categories={menuData.categories} />
        </div>
      </section>

      {/* ── 05. COST ─────────────────────────────── */}
      <section id="cost" style={{ ...section }}>
        <SectionTitle sub="숨겨진 비용 없이 항목별 공개">
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
      <section style={{ ...sectionSoft }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <SectionTitle sub={supportData.subtitle}>
            {supportData.title}
          </SectionTitle>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          }}>
            {supportData.items.map((item) => (
              <div key={item.id} style={{
                background: 'var(--color-bg)',
                borderRadius: '6px',
                padding: '24px 20px',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{SUPPORT_ICONS[item.id] ?? '•'}</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text)', marginBottom: '6px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.55' }}>{item.description}</div>
              </div>
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
          {processData.steps.map((step) => (
            <div key={step.id} style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px', height: '56px',
                borderRadius: '50%',
                background: 'var(--color-accent)',
                color: '#fff',
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
            {ownersData.map((owner) => (
              <OwnerInterviewCard key={owner.id} owner={owner} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 09. STORES MAP ───────────────────────── */}
      <section style={{ ...section }}>
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
      <section style={{ background: 'var(--color-cta)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)', marginBottom: '14px', textTransform: 'uppercase' }}>
            무료 가맹 설명회 · {eventData.schedule}
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: '800', color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
            {eventData.title}
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', marginBottom: '6px' }}>
            {eventData.location}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '28px' }}>
            선착순 {eventData.seatsLeft}석 — {eventData.benefits.join(' · ')}
          </p>
          <a href="#contact" style={{
            padding: '13px 36px',
            borderRadius: '4px',
            background: '#fff',
            color: 'var(--color-cta)',
            fontSize: '15px',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            설명회 신청하기 →
          </a>
        </div>
      </section>

      {/* ── 11. CONTACT ──────────────────────────── */}
      <section id="contact" style={{ ...section }}>
        <SectionTitle sub="전담 매니저가 영업일 기준 1~2일 내 연락드립니다">
          가맹 문의
        </SectionTitle>
        <FnbContactForm />
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
    </div>
  );
}
