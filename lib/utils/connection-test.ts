import { testBackendConnection, API_BASE_URL, voiceCommandAPI, inventoryAPI } from '../api';

/**
 * Comprehensive backend connection test
 * Run this on app startup to verify backend connectivity
 */
export async function runConnectionTests() {
  console.log('🔍 Running Backend Connection Tests...\n');
  console.log(`📡 API Base URL: ${API_BASE_URL}\n`);

  const results = {
    health: false,
    voices: false,
    inventory: false,
    overall: false,
  };

  // Test 1: Health Check
  try {
    console.log('1️⃣ Testing health endpoint...');
    results.health = await testBackendConnection();
    console.log(results.health ? '✅ Health check passed' : '❌ Health check failed');
  } catch (error) {
    console.error('❌ Health check error:', error);
  }

  // Test 2: Voice API
  try {
    console.log('\n2️⃣ Testing voice API...');
    const voices = await voiceCommandAPI.getVoices();
    results.voices = voices && voices.voices && voices.voices.length > 0;
    console.log(results.voices 
      ? `✅ Voice API working (${voices.voices.length} voices available)` 
      : '⚠️ Voice API working but no voices available'
    );
  } catch (error) {
    console.error('❌ Voice API error:', error);
  }

  // Test 3: Inventory API
  try {
    console.log('\n3️⃣ Testing inventory API...');
    const items = await inventoryAPI.getItems();
    results.inventory = items && items.success;
    console.log(results.inventory 
      ? `✅ Inventory API working (${items.count || 0} items)` 
      : '❌ Inventory API failed'
    );
  } catch (error) {
    console.error('❌ Inventory API error:', error);
  }

  // Overall result
  results.overall = results.health && results.voices && results.inventory;

  console.log('\n' + '='.repeat(50));
  console.log('📊 Connection Test Results:');
  console.log('='.repeat(50));
  console.log(`Health Check:    ${results.health ? '✅' : '❌'}`);
  console.log(`Voice API:       ${results.voices ? '✅' : '❌'}`);
  console.log(`Inventory API:   ${results.inventory ? '✅' : '❌'}`);
  console.log(`Overall Status:  ${results.overall ? '✅ ALL SYSTEMS GO' : '⚠️ SOME ISSUES DETECTED'}`);
  console.log('='.repeat(50) + '\n');

  if (!results.overall) {
    console.warn('⚠️ Troubleshooting Tips:');
    console.warn('  1. Ensure backend is running: npm run dev');
    console.warn('  2. Check if you\'re on the same WiFi network (for mobile)');
    console.warn(`  3. Verify backend URL is correct: ${API_BASE_URL}`);
    console.warn('  4. Check backend logs for errors\n');
  }

  return results;
}

/**
 * Quick health check (for periodic checks during app usage)
 */
export async function quickHealthCheck(): Promise<boolean> {
  try {
    const isHealthy = await testBackendConnection();
    return isHealthy;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

/**
 * Test a specific voice command
 */
export async function testVoiceCommand(command: string = 'Check stock status') {
  console.log(`\n🎤 Testing voice command: "${command}"`);
  
  try {
    const response = await voiceCommandAPI.sendCommand(command);
    console.log('✅ Voice command successful:');
    console.log('  Intent:', response.intent);
    console.log('  Response:', response.response);
    console.log('  Audio URL:', response.audioUrl || 'N/A');
    return true;
  } catch (error) {
    console.error('❌ Voice command failed:', error);
    return false;
  }
}

/**
 * Display connection status in a user-friendly way
 */
export function getConnectionStatusMessage(results: Awaited<ReturnType<typeof runConnectionTests>>) {
  if (results.overall) {
    return {
      status: 'connected',
      title: '🟢 Connected',
      message: 'All backend services are operational',
      color: '#10b981',
    };
  } else if (results.health) {
    return {
      status: 'partial',
      title: '🟡 Partial Connection',
      message: 'Backend is reachable but some services are unavailable',
      color: '#f59e0b',
    };
  } else {
    return {
      status: 'disconnected',
      title: '🔴 Disconnected',
      message: 'Cannot connect to backend. Check your connection.',
      color: '#ef4444',
    };
  }
}

