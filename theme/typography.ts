export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 16,
    lg: 18,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
  },

  // Font weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
