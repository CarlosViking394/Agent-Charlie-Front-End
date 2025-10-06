# Centralized Design System

This folder contains the centralized design system for the Agent Charlie Front-End application. All styling should be done through this design system rather than inline StyleSheet.create() calls.

## Structure

### 📁 Files

- **colors.ts** - All color tokens and brand colors
- **typography.ts** - Font sizes, weights, and line heights
- **spacing.ts** - Spacing values and border radius tokens
- **components.ts** - Pre-built component styles
- **animations.ts** - Animation configurations
- **index.ts** - Main export file

## Usage

### Import the design system

```tsx
import { colors, textStyles, buttonStyles, containerStyles } from '@/theme';
```

### Using color tokens

```tsx
<View style={{ backgroundColor: colors.primary }}>
  <Text style={{ color: colors.textPrimary }}>Hello</Text>
</View>
```

### Using pre-built component styles

```tsx
import { containerStyles, textStyles, buttonStyles } from '@/theme';

function MyScreen() {
  return (
    <View style={containerStyles.container}>
      <Text style={textStyles.title}>My Title</Text>
      <TouchableOpacity style={buttonStyles.primary}>
        <Text style={buttonStyles.primaryText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Available Style Categories

#### Container Styles
- `containerStyles.container` - Main container
- `containerStyles.content` - Content wrapper
- `containerStyles.backgroundOverlay` - Background overlay

#### Text Styles
- `textStyles.title` - Page titles
- `textStyles.label` - Form labels
- `textStyles.demoTitle` - Demo/info titles
- `textStyles.demoText` - Demo/info text
- `textStyles.errorText` - Error messages
- `textStyles.linkText` - Links

#### Input Styles
- `inputStyles.formContainer` - Form wrapper
- `inputStyles.inputContainer` - Input wrapper
- `inputStyles.input` - Text input field

#### Button Styles
- `buttonStyles.primary` - Primary button
- `buttonStyles.primaryDisabled` - Disabled state
- `buttonStyles.primaryText` - Button text

#### Alert Styles
- `alertStyles.demoInfo` - Info/demo boxes
- `alertStyles.errorContainer` - Error containers

## Benefits

✅ **Consistency** - All components use the same design tokens
✅ **Maintainability** - Update styles in one place
✅ **Type Safety** - Full TypeScript support
✅ **Reusability** - Import and use anywhere
✅ **Scalability** - Easy to extend with new tokens

## Best Practices

1. **Always use theme tokens** instead of hardcoded values
2. **Import only what you need** for better tree-shaking
3. **Extend existing styles** when creating new components
4. **Don't use StyleSheet.create()** in component files

## Example Migration

### Before (inline styles):
```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101c22',
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  }
});
```

### After (centralized design):
```tsx
import { containerStyles, textStyles } from '@/theme';

// Use directly:
<View style={containerStyles.container}>
  <Text style={textStyles.title}>Title</Text>
</View>
```
