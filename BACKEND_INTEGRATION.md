# Backend Integration Guide

## ✅ Integration Complete!

Your frontend is now fully integrated with the backend. All voice and inventory APIs are connected and ready to use.

## 🔧 Configuration

### Automatic Network Detection

The API configuration automatically detects your environment:

- **Mobile Devices (iOS/Android)**: `http://192.168.1.196:3000/api`
- **Web/Simulator**: `http://localhost:3000/api`

**Current IP Address**: `192.168.1.196`

### Manual Configuration

If you need to change the API URL, edit `/Users/LocalAdmin/Desktop/Local/Personal/Agent-Charlie-Front-End/lib/api.ts`:

```typescript
const getApiBaseUrl = () => {
  if (__DEV__ && (Platform.OS === 'ios' || Platform.OS === 'android')) {
    return 'http://YOUR_IP_HERE:3000/api';  // Change this
  }
  return 'http://localhost:3000/api';
};
```

## 🚀 Available APIs

### Voice Command API

```typescript
import { voiceCommandAPI } from './lib/api';

// Send text command
const response = await voiceCommandAPI.sendCommand('Check stock of widgets');

// Send audio command
const response = await voiceCommandAPI.sendAudioCommand(audioUri);

// Transcribe audio to text
const result = await voiceCommandAPI.transcribe(audioUri);

// Synthesize text to speech
const result = await voiceCommandAPI.synthesize('Hello world', voiceId);

// Get available voices
const voices = await voiceCommandAPI.getVoices();
```

### Inventory API

```typescript
import { inventoryAPI } from './lib/api';

// Get all items
const items = await inventoryAPI.getItems();

// Get single item
const item = await inventoryAPI.getItem(id);

// Create item
const newItem = await inventoryAPI.createItem({
  name: 'Widget',
  sku: 'WDG-001',
  category: 'Electronics',
  quantity: 100,
});

// Update item
const updated = await inventoryAPI.updateItem(id, { quantity: 150 });

// Update quantity only
const updated = await inventoryAPI.updateQuantity(id, 150);

// Delete item
await inventoryAPI.deleteItem(id);

// Get statistics
const stats = await inventoryAPI.getStats();
```

### Health Check API

```typescript
import { healthAPI, testBackendConnection } from './lib/api';

// Quick health check
const isHealthy = await healthAPI.check();

// Detailed connection test with console output
const isConnected = await testBackendConnection();
```

## 🎯 Using Hooks

### Voice Command Hook

```typescript
import { useVoiceCommand } from './hooks/useVoiceCommand';

function MyComponent() {
  const {
    isRecording,
    isProcessing,
    currentCommand,
    commandHistory,
    startRecording,
    stopRecording,
    sendCommand,
    speakText,
  } = useVoiceCommand();

  const handleVoiceCommand = async () => {
    await startRecording();
    // User speaks...
    const uri = await stopRecording();
    const command = await sendRecordedCommand(uri);
  };

  const handleTextCommand = async () => {
    const command = await sendCommand('Show inventory');
  };
}
```

### Voice Store (Zustand)

```typescript
import { useVoiceStore } from './stores/useVoiceStore';

function MyComponent() {
  const {
    isProcessing,
    commandHistory,
    sendTextCommand,
    loadVoices,
  } = useVoiceStore();

  useEffect(() => {
    loadVoices(); // Load available voices on mount
  }, []);

  const sendCommand = async () => {
    const command = await sendTextCommand('Check stock levels');
  };
}
```

### Command Store

```typescript
import { useCommandStore } from './stores/useCommandStore';

function MyComponent() {
  const {
    commands,
    isExecuting,
    executeTextCommand,
    getRecentCommands,
  } = useCommandStore();

  const recentCommands = getRecentCommands(5);
}
```

## 🧪 Testing the Connection

### Method 1: Run Connection Tests

```typescript
import { runConnectionTests } from './lib/utils/connection-test';

// Run comprehensive tests
const results = await runConnectionTests();
```

### Method 2: Quick Health Check

```typescript
import { quickHealthCheck } from './lib/utils/connection-test';

const isHealthy = await quickHealthCheck();
```

### Method 3: Test Voice Command

```typescript
import { testVoiceCommand } from './lib/utils/connection-test';

await testVoiceCommand('Check stock status');
```

### Method 4: Manual Test from Terminal

```bash
# Test health
curl http://localhost:3000/api/health

# Test from your IP (for mobile)
curl http://192.168.1.196:3000/api/health

# Test voice command
curl -X POST http://localhost:3000/api/voice/command \
  -H "Content-Type: application/json" \
  -d '{"command": "Check stock status"}'

# Test inventory
curl http://localhost:3000/api/inventory
```

## 📁 File Structure

```
lib/
├── api.ts                          # Main API configuration & functions
├── types/
│   ├── api.types.ts               # API response types
│   ├── voice.types.ts             # Voice-specific types
│   └── database.types.ts          # Database types
├── voice/
│   ├── voiceManager.ts            # Voice command manager
│   ├── elevenlabs.ts              # ElevenLabs integration
│   └── whisper.ts                 # Whisper integration
└── utils/
    └── connection-test.ts         # Connection testing utilities

stores/
├── useVoiceStore.ts               # Voice state management
├── useCommandStore.ts             # Command history management
└── useProductStore.ts             # Product/inventory state

hooks/
├── useVoiceCommand.ts             # Voice command hook
└── useProductActions.ts           # Product actions hook
```

## 🔍 Backend Status

Backend is running at: **http://localhost:3000**

Current services status:
- ✅ Health Check: Working
- ⚠️ ElevenLabs: Not configured (needs API key)
- ⚠️ Whisper: Not configured (needs API key)

To enable voice services, add to backend `.env`:
```env
ELEVENLABS_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

## 🎨 Example Usage

### Complete Voice Command Flow

```typescript
import { useVoiceCommand } from './hooks/useVoiceCommand';

function VoiceCommandScreen() {
  const {
    isRecording,
    isProcessing,
    currentCommand,
    startRecording,
    stopRecording,
    sendCommand,
  } = useVoiceCommand();

  const handleVoice = async () => {
    if (isRecording) {
      // Stop recording
      const uri = await stopRecording();
      if (uri) {
        // Send to backend
        const command = await sendRecordedCommand(uri);
        console.log('Response:', command.response);
      }
    } else {
      // Start recording
      await startRecording();
    }
  };

  return (
    <View>
      <Button
        onPress={handleVoice}
        title={isRecording ? 'Stop' : 'Start Recording'}
        disabled={isProcessing}
      />
      {currentCommand && (
        <Text>{currentCommand.response}</Text>
      )}
    </View>
  );
}
```

### Inventory Management

```typescript
import { inventoryAPI } from './lib/api';
import { useProductStore } from './stores/useProductStore';

function InventoryScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const response = await inventoryAPI.getItems();
      setItems(response.data);
    } catch (error) {
      console.error('Failed to load inventory:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await inventoryAPI.updateQuantity(id, quantity);
      await loadInventory(); // Refresh
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  return (
    <View>
      {items.map(item => (
        <View key={item.id}>
          <Text>{item.name}: {item.quantity}</Text>
          <Button onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            Add 1
          </Button>
        </View>
      ))}
    </View>
  );
}
```

## 🛠️ Troubleshooting

### "Network request failed"
1. Ensure backend is running: `npm run dev` in backend directory
2. Check if you're using the correct IP address
3. Ensure both devices are on the same WiFi network
4. Check firewall settings

### "CORS error"
1. Add your frontend URL to `CORS_ORIGIN` in backend `.env`
2. Restart backend server after updating `.env`

### "Connection refused"
1. Backend might not be running - check with `curl http://localhost:3000/api/health`
2. Port 3000 might be blocked - check firewall
3. For mobile: Use your IP instead of localhost

### Voice services not working
1. Check backend logs for API key errors
2. Ensure `ELEVENLABS_API_KEY` and `OPENAI_API_KEY` are set in backend `.env`
3. Restart backend after adding keys

## 📝 Next Steps

1. ✅ Backend integration complete
2. ✅ API configuration done
3. ✅ Voice manager implemented
4. ✅ Stores configured
5. ✅ Hooks ready to use

**Now you can:**
- Use `useVoiceCommand()` hook in your components
- Call API functions directly from `lib/api.ts`
- Access voice stores for state management
- Test backend connection with utilities

## 🎉 Ready to Build!

Everything is set up and ready. Start using the voice commands and inventory APIs in your components!

For more details, check the backend's `FRONTEND_INTEGRATION.md` file.

