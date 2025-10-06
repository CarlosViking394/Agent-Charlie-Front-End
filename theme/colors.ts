export const colors = {
  // Brand colors
  primary: '#13a4ec',
  primaryDark: '#2d5f7a',

  // Background colors
  background: '#101c22',
  backgroundOverlay: 'rgba(16, 28, 34, 0.8)',
  surface: '#283339',

  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#9db0b9',

  // Status colors
  error: '#ef4444',
  errorBackground: 'rgba(239, 68, 68, 0.1)',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#3b82f6',

  // UI colors
  border: 'rgba(19, 164, 236, 0.3)',
  infoBg: 'rgba(19, 164, 236, 0.1)',

  // Opacity variants
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
