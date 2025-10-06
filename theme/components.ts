import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';

// Container styles
export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    zIndex: 10,
  } as ViewStyle,

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backgroundOverlay,
    zIndex: 0,
  } as ViewStyle,
});

// Logo styles
export const logoStyles = StyleSheet.create({
  logoContainer: {
    marginBottom: spacing.xl,
  } as ViewStyle,
});

// Typography styles
export const textStyles = StyleSheet.create({
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.base,
    textAlign: 'center',
  } as TextStyle,

  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  } as TextStyle,

  demoTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  } as TextStyle,

  demoText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    fontFamily: 'monospace',
  } as TextStyle,

  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.base,
    flex: 1,
  } as TextStyle,

  linkText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.base,
    textAlign: 'center',
    marginTop: spacing.md,
    textDecorationLine: 'underline',
  } as TextStyle,
});

// Input styles
export const inputStyles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 480,
  } as ViewStyle,

  inputContainer: {
    marginBottom: spacing.base,
  } as ViewStyle,

  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    height: spacing['4xl'],
    paddingHorizontal: spacing.base,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  } as TextStyle,
});

// Button styles
export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.base,
  } as ViewStyle,

  primaryDisabled: {
    backgroundColor: colors.primaryDark,
    opacity: 0.6,
  } as ViewStyle,

  primaryText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  } as TextStyle,
});

// Info/Alert box styles
export const alertStyles = StyleSheet.create({
  demoInfo: {
    backgroundColor: colors.infoBg,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 480,
    width: '100%',
  } as ViewStyle,

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    gap: spacing.sm,
  } as ViewStyle,
});
