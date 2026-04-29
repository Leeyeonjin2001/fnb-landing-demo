import Link from 'next/link';

const demos = [
  {
    id: 1,
    path: '/demos/fnb-pure',
    name: '1️⃣ FnB-PURE',
    desc: 'BASIC 100만 · 치킨 프랜차이즈 정적 (chicken-warm)',
    bg: '#FFF9F2',
    textColor: '#2A1810',
    border: '#F4D9B8',
    softText: '#6B4F3A',
  },
  {
    id: 2,
    path: '/demos/fnb-dynamic',
    name: '2️⃣ FnB-DYNAMIC',
    desc: 'MOTION 180만 · 영상 HERO + 카운트업 + 설명회 (chicken-bold)',
    bg: '#1A0F0A',
    textColor: '#F5E8D8',
    border: '#3D2418',
    softText: '#B89B7F',
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4', padding: '48px 24px', fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif" }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <p style={{ fontSize: '13px', color: '#A0A0A0', marginBottom: '8px', letterSpacing: '0.05em' }}>BLAST TEAM · FnB FRANCHISE LANDING TEMPLATE</p>
        <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px', color: '#1A1A1A' }}>
          cirken — FnB 가맹 모집 데모
        </h1>
        <p style={{ color: '#6B6B6B', marginBottom: '40px', fontSize: '14px' }}>
          치킨 프랜차이즈 가맹 모집 2종 샘플 · 데모 카드를 클릭해서 확인하세요
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {demos.map((demo) => (
            <Link key={demo.id} href={demo.path} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: demo.bg,
                  border: `1px solid ${demo.border}`,
                  borderRadius: '12px',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: demo.textColor, marginBottom: '3px' }}>
                    {demo.name}
                  </div>
                  <div style={{ fontSize: '13px', color: demo.softText }}>
                    {demo.desc}
                  </div>
                </div>
                <span style={{ fontSize: '18px', color: demo.softText }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: '40px', color: '#C0C0C0', fontSize: '12px', textAlign: 'center' }}>
          DEV-001 완료 · DEV-002~008 진행 예정
        </p>
      </div>
    </div>
  );
}
