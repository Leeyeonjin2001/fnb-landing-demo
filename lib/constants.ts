export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME ?? 'eddie-lee-test';
export const CAL_EVENT = process.env.NEXT_PUBLIC_CAL_EVENT ?? '30min';

export const THEMES = ['white', 'wood', 'dark', 'mixed'] as const;
export type Theme = typeof THEMES[number];

export const DEMO_THEMES: Record<number, Theme> = {
  1: 'white',
  2: 'wood',
  3: 'dark',
  4: 'mixed',
};

export const PRICING_MATRIX = {
  perPyeong: {
    standard: 2_000_000,
    premium: 3_500_000,
    highEnd: 5_000_000,
  },
  styleModifier: {
    modern: 1.0,
    natural: 1.0,
    scandinavian: 1.05,
    classic: 1.15,
  },
  scopeModifier: {
    full: 1.0,
    partial: 0.4,
  },
} as const;
