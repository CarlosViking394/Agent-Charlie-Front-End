# Testing Guide - Agent Charlie Front End

This guide covers all testing approaches for the Agent Charlie application.

## Quick Test with Docker

The fastest way to test the application is using Docker:

### 1. Automated Test Script

Run the automated test script to verify everything is set up correctly:

```bash
./docker-test.sh
```

This script will:
- ✓ Check Docker installation
- ✓ Build the Docker image
- ✓ Run TypeScript type checking
- ✓ Start the container
- ✓ Verify ports are accessible
- ✓ Display logs
- ✓ Clean up

### 2. Manual Docker Testing

```bash
# Build and start
npm run docker:build
npm run docker:up

# In another terminal, check TypeScript
npm run docker:type-check

# View logs
npm run docker:logs

# Stop when done
npm run docker:down
```

### 3. Access the Application

Once running, open your browser to:

**Web Application:**
- http://localhost:19006

**Development Tools:**
- Metro Bundler: http://localhost:8081
- Expo DevTools: http://localhost:19000

## Local Testing (Without Docker)

### Prerequisites

Ensure you have installed:
```bash
npm install
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

### Running the App

```bash
# Start Expo dev server
npm start

# Or start directly for web
npm run web
```

## Testing Individual Screens

### Navigation Flow

1. **Start at Login** (`app/(auth)/login.tsx`)
   - Enter any email/password
   - Click Login button
   - Should redirect to Dashboard

2. **Onboarding** (`app/(auth)/onboarding.tsx`)
   - View 5-step onboarding flow
   - Click "Next" through steps
   - Click "Skip" to jump to Dashboard
   - Click "Get Started" on last step

3. **Dashboard Home** (`app/(tabs)/index.tsx`)
   - View central voice command orb
   - See 4 stat cards
   - Check bottom navigation

4. **Inventory** (`app/(tabs)/inventory.tsx`)
   - View sales performance chart
   - See predictive demand bars
   - Check low stock alerts
   - Click "Reorder" buttons

5. **Insights** (`app/(tabs)/insights.tsx`)
   - View AI insights card
   - See KPI metrics with trends
   - Check charts (line, donut, bar)
   - View actionable recommendations

6. **Voice Command** (`app/(tabs)/voice.tsx`)
   - View waveform visualization
   - Click mic button
   - Test quick command chips
   - View conversation history

### Component Testing Checklist

#### Authentication Flow
- [ ] Login form displays correctly
- [ ] Input fields accept text
- [ ] Login button is clickable
- [ ] Forgot password link works
- [ ] Dark theme is applied

#### Onboarding
- [ ] Progress dots update correctly
- [ ] Content changes per step
- [ ] "Next" button advances
- [ ] "Skip" button navigates to tabs
- [ ] "Get Started" on final step works

#### Dashboard Home
- [ ] Central orb is visible
- [ ] All 4 stat cards display
- [ ] Stats show correct values
- [ ] Bottom navigation is visible
- [ ] Navigation icons are correct

#### Inventory Screen
- [ ] Header displays correctly
- [ ] Stat cards show data
- [ ] Charts render properly
- [ ] Alert items are listed
- [ ] Reorder buttons work
- [ ] Footer navigation functions

#### Insights Screen
- [ ] AI insight card displays
- [ ] KPI cards show metrics
- [ ] Trend indicators (up/down) appear
- [ ] Charts placeholder is visible
- [ ] Recommendations display
- [ ] Action buttons are clickable
- [ ] Voice FAB is visible

#### Voice Command Screen
- [ ] Back button works
- [ ] Waveform area displays
- [ ] Mic button is visible
- [ ] Quick commands scroll
- [ ] History items display
- [ ] User/Assistant distinction clear

## UI/UX Testing

### Visual Testing

Check the following visual elements:

**Colors:**
- [ ] Primary color (#13a4ec) used correctly
- [ ] Cyan accent (#00FFFF) on active states
- [ ] Dark backgrounds consistent
- [ ] Text is readable

**Typography:**
- [ ] Font sizes are appropriate
- [ ] Font weights are correct
- [ ] Text is aligned properly
- [ ] Line heights are comfortable

**Spacing:**
- [ ] Consistent padding/margins
- [ ] Cards have proper spacing
- [ ] No overlapping elements
- [ ] Responsive layout works

**Effects:**
- [ ] Shadows render correctly
- [ ] Borders have proper opacity
- [ ] Buttons have hover/press states
- [ ] Animations are smooth

### Interaction Testing

**Touch Targets:**
- [ ] Buttons are easy to tap (min 44x44)
- [ ] Links are clickable
- [ ] Form inputs are accessible
- [ ] Navigation works smoothly

**Feedback:**
- [ ] Button presses provide feedback
- [ ] Loading states display (if implemented)
- [ ] Error messages show (if implemented)
- [ ] Success confirmations appear

## Performance Testing

### Load Time
```bash
# Measure initial load
npm start

# Check Metro bundler output for:
# - Bundle size
# - Transform time
# - Build time
```

### Memory Usage

Monitor in browser DevTools:
1. Open http://localhost:19006
2. Open DevTools (F12)
3. Go to Performance tab
4. Record while navigating
5. Check for memory leaks

### Frame Rate

Check for smooth 60fps:
1. Enable React DevTools Profiler
2. Navigate between screens
3. Look for frame drops
4. Optimize if needed

## Browser Testing

Test in multiple browsers:

**Desktop:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Mobile (if using Expo Go):**
- [ ] iOS Safari
- [ ] Chrome on Android

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Forms are keyboard accessible
- [ ] Focus indicators are visible

### Screen Reader
- [ ] Elements have proper labels
- [ ] Images have alt text (when added)
- [ ] Form inputs have labels
- [ ] Navigation is logical

### Color Contrast
- [ ] Text meets WCAG AA standards
- [ ] Buttons have sufficient contrast
- [ ] Links are distinguishable

## Cross-Platform Testing

### Web Browser
```bash
npm run web
```
Test all screens work in browser.

### iOS Simulator (Mac only)
```bash
npm run ios
```
Test native iOS experience.

### Android Emulator
```bash
npm run android
```
Test native Android experience.

## Common Test Scenarios

### Scenario 1: New User Flow
1. Open app → See login
2. Enter credentials → Login
3. View onboarding → Complete all steps
4. Land on dashboard → Explore features

### Scenario 2: Returning User
1. Open app → Auto-login (when implemented)
2. See dashboard directly
3. Navigate to inventory
4. Check alerts

### Scenario 3: Voice Command Use
1. Navigate to Voice tab
2. Click mic button
3. View listening state
4. Use quick commands
5. Check history

### Scenario 4: Insights Review
1. Navigate to Insights tab
2. Read AI recommendation
3. View charts
4. Click action buttons

## Debugging

### Common Issues

**App won't start:**
```bash
# Clear Metro cache
npx expo start --clear

# Or with Docker
npm run docker:clean
npm run docker:build
npm run docker:up
```

**TypeScript errors:**
```bash
# Check all errors
npm run type-check

# Or in Docker
npm run docker:type-check
```

**Port conflicts:**
```bash
# Find what's using the port
lsof -ti:19006 | xargs kill -9

# Or change ports in app.json
```

**Styling issues:**
```bash
# Check React Native Web compatibility
# Some styles may not work the same in web vs native
```

### Debug Mode

Enable debug mode in Expo:
1. Press `m` in terminal to open menu
2. Select "Debug Remote JS"
3. Chrome DevTools will open
4. Use console, network, debugger

### Logging

Add console logs for debugging:
```typescript
console.log('Component mounted', { props, state });
console.error('API call failed', error);
console.warn('Deprecated feature used');
```

View logs:
```bash
# Local
# Logs appear in terminal

# Docker
npm run docker:logs
```

## Test Reporting

Create a test report with findings:

```markdown
# Test Report - Agent Charlie

## Date: [Date]
## Tester: [Name]
## Environment: [Docker/Local/Web/iOS/Android]

### Screens Tested
- [x] Login
- [x] Onboarding
- [x] Dashboard Home
- [x] Inventory
- [x] Insights
- [x] Voice Command

### Issues Found
1. [Issue description]
   - Severity: High/Medium/Low
   - Steps to reproduce
   - Expected vs Actual
   - Screenshots (if applicable)

### Performance
- Load time: X seconds
- Memory usage: X MB
- Frame rate: X fps

### Recommendations
- [Suggestion 1]
- [Suggestion 2]

### Overall Status
✓ Passed / ✗ Failed / ⚠ Passed with issues
```

## Continuous Testing

### Before Committing
```bash
# Always run before git commit
npm run type-check

# Or with Docker
npm run docker:type-check
```

### Before Deploying
```bash
# Full test suite
./docker-test.sh

# Manual verification
npm run docker:up
# Test all screens manually
# Check console for errors
npm run docker:down
```

## Next Steps: Automated Testing

When ready, add:

1. **Unit Tests** (Jest + React Native Testing Library)
   ```bash
   npm install --save-dev jest @testing-library/react-native
   ```

2. **E2E Tests** (Detox or Appium)
   ```bash
   npm install --save-dev detox
   ```

3. **Visual Regression** (Percy or Chromatic)
   ```bash
   npm install --save-dev @percy/cli
   ```

4. **Coverage Reports**
   ```bash
   npm test -- --coverage
   ```

## Resources

- [Expo Testing Guide](https://docs.expo.dev/develop/unit-testing/)
- [React Native Testing](https://reactnative.dev/docs/testing-overview)
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/)

---

**Happy Testing! 🧪✅**
