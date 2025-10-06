// Export all theme configurations
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './components';
export * from './animations';

// Re-export for convenience
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';
import * as components from './components';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  components,
} as const;

export default theme;
