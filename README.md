# Agent Charlie - AI Inventory Management

A modern React Native mobile application built with Expo for AI-powered inventory management with voice commands and predictive analytics.

## Features

- 🔐 **Secure Login** - Dark-themed authentication
- 📱 **Onboarding Experience** - Multi-step guided setup
- 🏠 **Dashboard Home** - Central command with real-time stats
- 📦 **Inventory Management** - Comprehensive inventory tracking with charts
- 📊 **AI Insights** - Analytics dashboard with AI-powered recommendations
- 🎤 **Voice Commands** - Natural language inventory control
- 🎨 **Modern UI** - Dark theme with glassmorphic effects and glowing elements

## Tech Stack

- **React Native** 0.76.5
- **Expo** ~52.0.0
- **Expo Router** ~4.0.0 (File-based routing)
- **TypeScript** ~5.3.3
- **Lucide React Native** (Icons)
- **Expo Linear Gradient**

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

**OR use Docker** (recommended for testing):
- Docker Desktop
- Docker Compose

### Installation

#### Option 1: Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

#### Option 2: Docker (Recommended for Testing)

1. Build and start the container:
```bash
npm run docker:build
npm run docker:up
```

2. Open your browser to:
```
http://localhost:19006
```

3. To stop:
```bash
npm run docker:down
```

**Docker Quick Commands:**
```bash
# Run tests
npm run docker:test

# Type check
npm run docker:type-check

# View logs
npm run docker:logs

# Access shell
npm run docker:shell

# Full cleanup
npm run docker:clean
```

For complete Docker documentation, see [DOCKER.md](./DOCKER.md)

## Project Structure

```
agent-charlie-front-end/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx          # Login screen
│   │   ├── onboarding.tsx     # Onboarding flow
│   │   └── register.tsx       # Registration
│   ├── (tabs)/
│   │   ├── index.tsx          # Dashboard home
│   │   ├── inventory.tsx      # Inventory management
│   │   ├── insights.tsx       # Analytics dashboard
│   │   └── voice.tsx          # Voice command center
│   ├── modals/                # Modal screens
│   └── _layout.tsx            # Root layout
├── assets/
│   ├── images/                # Design screenshots
│   ├── fonts/                 # Custom fonts
│   └── sounds/                # Sound effects
├── components/
│   ├── atoms/                 # Basic UI components
│   ├── molecules/             # Composite components
│   └── organisms/             # Complex components
├── theme/                     # Theme configuration
├── stores/                    # State management
└── lib/                       # Utilities

```

## Design System

### Colors
- **Primary**: #13a4ec (Cyan)
- **Accent Cyan**: #00FFFF
- **Accent Pink**: #FF00AA
- **Background Dark**: #101c22, #0D0C14, #121212
- **Text**: #ffffff (white)

### Typography
- **Font Family**: Space Grotesk

### Effects
- Glassmorphic cards with backdrop blur
- Glowing shadows on interactive elements
- Gradient backgrounds with animated orbs

## Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

## Design Files

Design mockups are located in `assets/images/`:
- login-screen.png
- dashboard-home-*.png
- insights-dashboard.png
- inventory-management.png
- onboarding.png
- voice-command.png

## License

Private - All rights reserved
