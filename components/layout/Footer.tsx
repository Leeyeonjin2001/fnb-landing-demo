interface FooterProps {
  companyName?: string;
  businessNumber?: string;
  ceoName?: string;
  licenseNumber?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export default function Footer({
  companyName = 'OO인테리어',
  businessNumber = '123-45-67890',
  ceoName = '홍길동',
  licenseNumber = '실내건축 제 2024-001호',
  address = '서울시 강남구 테헤란로 123',
  phone = '010-1234-5678',
  email = 'contact@oo-interior.com',
}: FooterProps) {
  return (
    <footer style={{
      background: 'var(--color-bg-soft)',
      borderTop: '1px solid var(--color-border)',
      padding: '48px 24px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--color-text)', marginBottom: '8px' }}>
            {companyName}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-soft)', lineHeight: '1.8' }}>
            <span>대표: {ceoName}</span>
            <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
            <span>사업자등록번호: {businessNumber}</span>
            <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
            <span>면허: {licenseNumber}</span>
            <br />
            <span>주소: {address}</span>
            <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
            <span>전화: {phone}</span>
            <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
            <span>이메일: {email}</span>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--color-text-soft)' }}>
            © 2026 {companyName}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['이용약관', '개인정보처리방침'].map((label) => (
              <button key={label} style={{
                background: 'none',
                border: 'none',
                fontSize: '12px',
                color: 'var(--color-text-soft)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: 0,
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
