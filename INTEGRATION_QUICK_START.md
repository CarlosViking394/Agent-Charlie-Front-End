# 🚀 Backend Integration - Quick Start

## ✅ Status: READY TO USE

Your frontend is now fully integrated with your backend! Everything is set up and tested.

## 📊 Test Results

```
Backend Health: ✅ Connected
Voice API:      ✅ Working  
Inventory API:  ✅ Working (475 items, 3 products)
```

## 🎯 Quick Usage Examples

### 1. Send a Voice Command (Text)

```typescript
import { voiceCommandAPI } from './lib/api';

// Simple command
const response = await voiceCommandAPI.sendCommand('Check inventory status');
console.log(response.message); // "There are 189 units of product in stock."
```

### 2. Use the Voice Hook

```typescript
import { useVoiceCommand } from './hooks/useVoiceCommand';

function MyComponent() {
  const { sendCommand, isProcessing, currentCommand } = useVoiceCommand();

  const handleCommand = async () => {
    const result = await sendCommand('Show me low stock items');
    console.log(result.response);
  };

  return (
    <Button onPress={handleCommand} disabled={isProcessing}>
      {isProcessing ? 'Processing...' : 'Send Command'}
    </Button>
  );
}
```

### 3. Get Inventory Data

```typescript
import { inventoryAPI } from './lib/api';

// Get all items
const { data, count } = await inventoryAPI.getItems();
console.log(`Found ${count} items`);

// Get statistics
const { stats } = await inventoryAPI.getStats();
console.log(`Total: ${stats.totalItems}, Low Stock: ${stats.lowStockItems}`);
```

### 4. Voice Store (Zustand)

```typescript
import { useVoiceStore } from './stores/useVoiceStore';

function VoiceScreen() {
  const { 
    sendTextCommand, 
    commandHistory, 
    isProcessing 
  } = useVoiceStore();

  const handleVoice = async () => {
    await sendTextCommand('What is my inventory status?');
  };

  return (
    <View>
      <Button onPress={handleVoice}>Send Command</Button>
      <Text>History: {commandHistory.length} commands</Text>
    </View>
  );
}
```

## 🔧 Configuration

### Backend URL

**Auto-configured for your network:**
- Mobile: `http://192.168.1.196:3000/api`
- Web: `http://localhost:3000/api`

**To change:** Edit `lib/api.ts` and update the IP address.

### Available Endpoints

✅ **Voice Commands**
- POST `/voice/command` - Text command
- POST `/voice/command/audio` - Audio command
- POST `/voice/transcribe` - Speech-to-text
- POST `/voice/synthesize` - Text-to-speech
- GET `/voice/voices` - Get available voices

✅ **Inventory**
- GET `/inventory` - All items
- GET `/inventory/:id` - Single item
- POST `/inventory` - Create item
- PUT `/inventory/:id` - Update item
- PATCH `/inventory/:id/quantity` - Update quantity
- DELETE `/inventory/:id` - Delete item
- GET `/inventory/stats/summary` - Statistics

✅ **Health**
- GET `/health` - Backend health check

## 🧪 Test the Connection

### Option 1: In Code

```typescript
import { runConnectionTests } from './lib/utils/connection-test';

// Run on app startup
useEffect(() => {
  runConnectionTests();
}, []);
```

### Option 2: Terminal

```bash
# Health check
curl http://localhost:3000/api/health

# Voice command
curl -X POST http://localhost:3000/api/voice/command \
  -H "Content-Type: application/json" \
  -d '{"command": "Check inventory"}'

# Inventory stats
curl http://localhost:3000/api/inventory/stats/summary
```

## 📚 Key Files Created

| File | Purpose |
|------|---------|
| `lib/api.ts` | All API functions and configuration |
| `lib/types/api.types.ts` | TypeScript types for API responses |
| `lib/types/voice.types.ts` | Voice-specific types |
| `lib/voice/voiceManager.ts` | Voice command orchestration |
| `lib/voice/elevenlabs.ts` | ElevenLabs integration |
| `lib/voice/whisper.ts` | Whisper integration |
| `stores/useVoiceStore.ts` | Voice state management |
| `stores/useCommandStore.ts` | Command history management |
| `hooks/useVoiceCommand.ts` | Voice command hook |
| `lib/utils/connection-test.ts` | Connection testing utilities |

## 🎨 Integration Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React Native)         │
│                                         │
│  ┌─────────────┐    ┌──────────────┐  │
│  │   Hooks     │───▶│    Stores    │  │
│  │ useVoice... │    │ useVoiceStore│  │
│  └─────────────┘    └──────────────┘  │
│         │                   │          │
│         └───────┬───────────┘          │
│                 ▼                      │
│         ┌──────────────┐               │
│         │   API Layer  │               │
│         │   (lib/api)  │               │
│         └──────────────┘               │
└─────────────┬───────────────────────────┘
              │ HTTP
              ▼
┌─────────────────────────────────────────┐
│           Backend (Node.js)             │
│                                         │
│  ┌─────────────┐    ┌──────────────┐  │
│  │   Routes    │───▶│  Controllers │  │
│  │   /voice    │    │   /inventory │  │
│  └─────────────┘    └──────────────┘  │
│         │                   │          │
│         ├───────────────────┤          │
│         ▼                   ▼          │
│  ┌─────────────┐    ┌──────────────┐  │
│  │ ElevenLabs  │    │   Database   │  │
│  │  + Whisper  │    │  (Supabase)  │  │
│  └─────────────┘    └──────────────┘  │
└─────────────────────────────────────────┘
```

## ⚡ Voice Services Setup

Your backend is ready, but **voice services need API keys**:

### 1. Get API Keys

- **ElevenLabs**: https://elevenlabs.io/ (Text-to-Speech)
- **OpenAI**: https://platform.openai.com/ (Whisper Speech-to-Text)

### 2. Add to Backend `.env`

```env
ELEVENLABS_API_KEY=your_elevenlabs_key_here
OPENAI_API_KEY=your_openai_key_here
```

### 3. Restart Backend

```bash
cd ../Agent-Charlie-Back-End
npm run dev
```

## 🎯 Next Steps

1. ✅ Integration complete - Start coding!
2. 🎤 Add API keys for voice services (optional)
3. 🎨 Build your UI using the hooks and stores
4. 📱 Test on mobile device (already configured)

## 💡 Pro Tips

1. **Use Hooks**: `useVoiceCommand()` is the easiest way to add voice
2. **Error Handling**: All API functions throw errors you can catch
3. **Loading States**: Hooks provide `isProcessing`, `isRecording`, etc.
4. **History**: Access `commandHistory` for previous commands
5. **TypeScript**: Full type safety with `api.types.ts`

## 🆘 Need Help?

Check these files:
- `BACKEND_INTEGRATION.md` - Full documentation
- `lib/utils/connection-test.ts` - Test utilities
- Backend's `FRONTEND_INTEGRATION.md` - Backend details

---

**You're all set! Start building your voice-powered inventory app! 🚀**

