import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Automatically detect the right API URL based on the environment
const getApiBaseUrl = () => {
  // For physical iOS device or Android device
  if (__DEV__ && (Platform.OS === 'ios' || Platform.OS === 'android')) {
    return 'http://192.168.1.196:3000/api';
  }
  
  // For web or simulator
  return 'http://localhost:3000/api';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

// ============================================================================
// VOICE COMMAND API
// ============================================================================

export const voiceCommandAPI = {
  /**
   * Send a text-based voice command
   */
  sendCommand: async (command: string) => {
    const response = await fetch(`${API_BASE_URL}/voice/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    });
    return handleResponse(response);
  },

  /**
   * Send an audio file for voice command processing
   * @param audioUri - URI of the audio file (local file path)
   */
  sendAudioCommand: async (audioUri: string) => {
    const formData = new FormData();
    
    // For React Native, we need to format the file properly
    const audioFile: any = {
      uri: audioUri,
      type: 'audio/mp3',
      name: 'command.mp3',
    };
    
    formData.append('audio', audioFile);

    const response = await fetch(`${API_BASE_URL}/voice/command/audio`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  },

  /**
   * Transcribe audio to text using Whisper
   */
  transcribe: async (audioUri: string) => {
    const formData = new FormData();
    
    const audioFile: any = {
      uri: audioUri,
      type: 'audio/mp3',
      name: 'audio.mp3',
    };
    
    formData.append('audio', audioFile);

    const response = await fetch(`${API_BASE_URL}/voice/transcribe`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  },

  /**
   * Synthesize text to speech using ElevenLabs
   * Returns audio URL from the backend
   */
  synthesize: async (text: string, voiceId?: string) => {
    const response = await fetch(`${API_BASE_URL}/voice/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceId }),
    });
    return handleResponse(response);
  },

  /**
   * Get list of available voices from ElevenLabs
   */
  getVoices: async () => {
    const response = await fetch(`${API_BASE_URL}/voice/voices`);
    return handleResponse(response);
  },
};

// ============================================================================
// INVENTORY API
// ============================================================================

export const inventoryAPI = {
  /**
   * Get all inventory items
   */
  getItems: async () => {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    return handleResponse(response);
  },

  /**
   * Get a single inventory item by ID
   */
  getItem: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`);
    return handleResponse(response);
  },

  /**
   * Create a new inventory item
   */
  createItem: async (item: {
    name: string;
    sku: string;
    category: string;
    quantity: number;
    warehouse?: string;
    location?: string;
    min_stock?: number;
    max_stock?: number;
    unit_price?: number;
    description?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return handleResponse(response);
  },

  /**
   * Update an inventory item
   */
  updateItem: async (id: string, updates: Partial<{
    name: string;
    sku: string;
    category: string;
    quantity: number;
    warehouse: string;
    location: string;
    min_stock: number;
    max_stock: number;
    unit_price: number;
    description: string;
  }>) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  /**
   * Update only the quantity of an item
   */
  updateQuantity: async (id: string, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}/quantity`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    return handleResponse(response);
  },

  /**
   * Delete an inventory item
   */
  deleteItem: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  /**
   * Get inventory statistics summary
   */
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/inventory/stats/summary`);
    return handleResponse(response);
  },
};

// ============================================================================
// HEALTH CHECK API
// ============================================================================

export const healthAPI = {
  /**
   * Check if backend is healthy and connected
   */
  check: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await handleResponse<{ success: boolean; timestamp: string }>(response);
      console.log('✅ Backend connected:', data);
      return data.success;
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      return false;
    }
  },
};

// Export a function to test the connection on app startup
export const testBackendConnection = async () => {
  console.log(`🔌 Testing backend connection at: ${API_BASE_URL}`);
  const isConnected = await healthAPI.check();
  
  if (isConnected) {
    console.log('✅ Backend is ready!');
  } else {
    console.warn('⚠️ Backend is not responding. Please ensure:');
    console.warn('  1. Backend server is running (npm run dev)');
    console.warn('  2. You are on the same WiFi network (for mobile)');
    console.warn(`  3. Backend URL is correct: ${API_BASE_URL}`);
  }
  
  return isConnected;
};

