# Quick Start - Agent Charlie Front End

## 🚀 Fastest Way to Test

### Using Docker (Recommended)

```bash
# 1. Build and start
npm run docker:build
npm run docker:up

# 2. Open browser
open http://localhost:19006

# 3. Stop when done
npm run docker:down
```

### Using Automated Test Script

```bash
# Run full automated test
./docker-test.sh
```

## 📋 Available Commands

### Docker Commands
| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build Docker image |
| `npm run docker:up` | Start containers |
| `npm run docker:down` | Stop containers |
| `npm run docker:logs` | View logs |
| `npm run docker:type-check` | Run TypeScript checks |
| `npm run docker:shell` | Access container shell |
| `npm run docker:clean` | Full cleanup |

### Local Development
| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Start dev server |
| `npm run web` | Start web only |
| `npm run type-check` | Check TypeScript |

## 🎯 What to Test

### 1. Login Screen
- Location: http://localhost:19006
- Enter any email/password
- Click "Login"

### 2. Onboarding
- 5-step walkthrough
- Click "Next" or "Skip"

### 3. Dashboard Home
- Central voice command orb
- 4 stat cards
- Bottom navigation

### 4. Inventory Management
- Sales charts
- Low stock alerts
- Reorder buttons

### 5. Insights Dashboard
- AI-powered insights
- KPI metrics
- Analytics charts

### 6. Voice Command Center
- Voice waveform
- Quick commands
- Conversation history

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port
lsof -ti:19006 | xargs kill -9

# Or use Docker cleanup
npm run docker:clean
```

### TypeScript Errors
```bash
# Check errors
npm run docker:type-check
```

### Can't Connect to Browser
```bash
# Check container is running
docker ps

# View logs
npm run docker:logs

# Restart
npm run docker:down
npm run docker:up
```

## 📚 Full Documentation

- **[README.md](./README.md)** - Project overview
- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[DOCKER.md](./DOCKER.md)** - Complete Docker documentation
- **[TESTING.md](./TESTING.md)** - Testing guide

## ✅ Success Indicators

You'll know it's working when:

1. ✓ Container builds without errors
2. ✓ http://localhost:19006 loads
3. ✓ You see the login screen
4. ✓ Can navigate between screens
5. ✓ No console errors

## 🎨 Expected UI

- **Theme**: Dark mode with cyan/blue accents
- **Style**: Glassmorphic cards, glowing effects
- **Font**: Space Grotesk (loaded via Google Fonts)
- **Layout**: Mobile-first, responsive design

## 💡 Tips

- Use Chrome DevTools for debugging (F12)
- Check container logs if issues: `npm run docker:logs`
- Metro bundler runs on port 8081
- Expo dev tools on port 19000
- Web app on port 19006

## 🚨 Common First-Time Issues

1. **Docker not running**
   - Start Docker Desktop

2. **Ports in use**
   - Stop other Expo projects
   - Run `npm run docker:clean`

3. **Build fails**
   - Check internet connection
   - Try `npm run docker:build --no-cache`

4. **Slow performance**
   - Allocate more RAM to Docker (4GB+ recommended)
   - In Docker Desktop: Settings → Resources

## 🎯 Next Steps After Testing

1. Explore all screens
2. Check responsive design
3. Test navigation flows
4. Review TypeScript output
5. Check browser console for errors

---

**Need Help?** Check the full documentation in the files listed above.
