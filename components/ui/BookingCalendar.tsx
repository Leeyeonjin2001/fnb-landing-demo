'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface BookingCalendarProps {
  username: string;
  eventSlug: string;
}

export default function BookingCalendar({ username, eventSlug }: BookingCalendarProps) {
  const namespace = eventSlug;
  const calLink = `${username}/${eventSlug}`;

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, [namespace]);

  return (
    <section style={{ padding: '96px 24px', background: 'var(--color-bg-soft)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: 'var(--color-accent)', fontSize: '13px', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '12px' }}>
            BOOKING
          </p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            상담 일정 예약
          </h2>
          <p style={{ color: 'var(--color-text-soft)', fontSize: '15px' }}>
            원하시는 날짜와 시간을 선택하시면 담당자가 연락드립니다
          </p>
        </div>

        <div style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
        }}>
          <Cal
            namespace={namespace}
            calLink={calLink}
            style={{ width: '100%', height: '700px', overflow: 'scroll' }}
            config={{ layout: 'month_view' }}
          />
        </div>
      </div>
    </section>
  );
}
