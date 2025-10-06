# Setup Guide - Agent Charlie Front End

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Run on Platform
```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## Project Configuration

### Dependencies Installed
- ✅ React Native 0.76.5
- ✅ Expo 52.0.0
- ✅ Expo Router 4.0.0
- ✅ TypeScript 5.3.3
- ✅ Lucide React Native (Icons)
- ✅ Expo Linear Gradient
- ✅ React Native SVG

### Configuration Files
- ✅ `package.json` - Dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `babel.config.js` - Babel configuration
- ✅ `app.json` - Expo app configuration
- ✅ `.gitignore` - Git ignore rules

## Implemented Screens

### Authentication Flow
1. **Login** (`app/(auth)/login.tsx`)
   - Dark themed login interface
   - Email and password inputs
   - Animated background

2. **Onboarding** (`app/(auth)/onboarding.tsx`)
   - 5-step onboarding flow
   - Progress indicators
   - Animated sound wave icon

### Main Application (Tabs)
1. **Dashboard Home** (`app/(tabs)/index.tsx`)
   - Central voice command orb
   - Real-time stats grid
   - Bottom navigation

2. **Inventory Management** (`app/(tabs)/inventory.tsx`)
   - Sales performance charts
   - Predictive demand visualization
   - Low stock alerts
   - Reorder functionality

3. **Insights Dashboard** (`app/(tabs)/insights.tsx`)
   - AI-powered insights card
   - KPI metrics with trends
   - Line and donut charts
   - Actionable recommendations

4. **Voice Command** (`app/(tabs)/voice.tsx`)
   - Voice waveform visualization
   - Quick command shortcuts
   - Conversation history
   - Active listening indicator

## File Structure

```
app/
├── (auth)/
│   ├── _layout.tsx       # Auth stack navigator
│   ├── login.tsx
│   ├── onboarding.tsx
│   └── register.tsx
├── (tabs)/
│   ├── _layout.tsx       # Tab navigator
│   ├── index.tsx         # Dashboard home
│   ├── inventory.tsx
│   ├── insights.tsx
│   └── voice.tsx
├── modals/
│   ├── product-detail.tsx
│   ├── command-history.tsx
│   └── settings.tsx
├── _layout.tsx           # Root layout
└── index.tsx             # Entry redirect

assets/
├── images/               # Design screenshots & app icons
│   ├── login-screen.png
│   ├── dashboard-home-*.png
│   ├── insights-dashboard.png
│   ├── inventory-management.png
│   ├── onboarding.png
│   └── voice-command.png
├── fonts/
├── sounds/
└── animations/

components/
├── atoms/                # Basic components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── GlowCard.tsx
│   └── LoadingSpinner.tsx
├── molecules/            # Composite components
│   ├── MetricTile.tsx
│   ├── ProductCard.tsx
│   ├── CommandChip.tsx
│   └── VoiceWaveform.tsx
└── organisms/            # Complex components
    ├── DashboardHeader.tsx
    ├── InsightsChart.tsx
    ├── ProductCarousel.tsx
    └── VoiceCommandPanel.tsx
```

## Design System

### Colors
```typescript
const colors = {
  primary: '#13a4ec',
  accentCyan: '#00FFFF',
  accentPink: '#FF00AA',
  backgroundDark: '#101c22',
  backgroundDark2: '#0D0C14',
  backgroundDark3: '#121212',
  backgroundDark4: '#0D1B2A',
  textWhite: '#ffffff',
};
```

### Typography
- **Font**: Space Grotesk
- **Sizes**: 12px - 36px
- **Weights**: 300, 400, 500, 700

### Effects
- Glassmorphic cards with `backdrop-filter: blur()`
- Glowing shadows using `shadowColor` and `shadowOpacity`
- Gradient backgrounds with animated orbs
- Border highlights with opacity variations

## Next Steps

1. **Add State Management**
   - Implement Zustand/Redux for global state
   - Add authentication context

2. **Connect to Backend**
   - Set up API client
   - Implement data fetching hooks
   - Add error handling

3. **Implement Voice Features**
   - Integrate speech recognition
   - Add text-to-speech
   - Implement voice command processing

4. **Add Charts Library**
   - Install react-native-chart-kit or Victory Native
   - Replace placeholder charts with real visualizations

5. **Testing**
   - Set up Jest and React Native Testing Library
   - Add unit tests for components
   - Add integration tests for flows

## Troubleshooting

### Common Issues

**Metro bundler not starting:**
```bash
npx expo start --clear
```

**TypeScript errors:**
```bash
npm run tsc --noEmit
```

**Dependencies issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**iOS build issues:**
```bash
cd ios && pod install && cd ..
npm run ios
```

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [Lucide Icons](https://lucide.dev/)
