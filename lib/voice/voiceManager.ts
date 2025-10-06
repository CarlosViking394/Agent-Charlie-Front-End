import { voiceCommandAPI } from '../api';
import type {
  VoiceCommand,
  VoiceCommandStatus,
  VoiceRecording,
  Voice,
  VoiceManagerOptions,
} from '../types/voice.types';

/**
 * Voice Manager
 * 
 * Handles all voice-related operations including:
 * - Recording audio
 * - Sending commands to backend
 * - Managing voice responses
 * - Playing audio responses
 */
class VoiceManager {
  private options: VoiceManagerOptions;
  private commandHistory: VoiceCommand[] = [];
  private currentRecording: VoiceRecording | null = null;

  constructor(options: VoiceManagerOptions = {}) {
    this.options = {
      autoPlay: true,
      cacheAudio: false,
      maxHistorySize: 50,
      ...options,
    };
  }

  /**
   * Send a text command to the backend
   */
  async sendTextCommand(text: string): Promise<VoiceCommand> {
    const command: VoiceCommand = {
      id: this.generateCommandId(),
      text,
      timestamp: Date.now(),
      status: 'processing',
    };

    this.addToHistory(command);

    try {
      // Send to backend
      const response = await voiceCommandAPI.sendCommand(text);

      // Update command with response
      const updatedCommand: VoiceCommand = {
        ...command,
        status: 'completed',
        response: response.response,
        responseAudioUrl: response.audioUrl,
        intent: response.intent,
        entities: response.entities,
      };

      this.updateCommandInHistory(updatedCommand);

      // Auto-play response if enabled
      if (this.options.autoPlay && response.audioUrl) {
        await this.playAudioResponse(response.audioUrl);
      }

      return updatedCommand;
    } catch (error) {
      const errorCommand: VoiceCommand = {
        ...command,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      this.updateCommandInHistory(errorCommand);
      throw error;
    }
  }

  /**
   * Send an audio command to the backend
   */
  async sendAudioCommand(audioUri: string): Promise<VoiceCommand> {
    const command: VoiceCommand = {
      id: this.generateCommandId(),
      text: '', // Will be filled after transcription
      audioUri,
      timestamp: Date.now(),
      status: 'transcribing',
    };

    this.addToHistory(command);

    try {
      // Send to backend for processing
      const response = await voiceCommandAPI.sendAudioCommand(audioUri);

      // Update command with response
      const updatedCommand: VoiceCommand = {
        ...command,
        text: response.transcription || command.text,
        status: 'completed',
        response: response.response,
        responseAudioUrl: response.audioUrl,
        intent: response.intent,
        entities: response.entities,
      };

      this.updateCommandInHistory(updatedCommand);

      // Auto-play response if enabled
      if (this.options.autoPlay && response.audioUrl) {
        await this.playAudioResponse(response.audioUrl);
      }

      return updatedCommand;
    } catch (error) {
      const errorCommand: VoiceCommand = {
        ...command,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      this.updateCommandInHistory(errorCommand);
      throw error;
    }
  }

  /**
   * Transcribe audio to text
   */
  async transcribeAudio(audioUri: string): Promise<string> {
    try {
      const response = await voiceCommandAPI.transcribe(audioUri);
      return response.text;
    } catch (error) {
      console.error('Transcription failed:', error);
      throw error;
    }
  }

  /**
   * Synthesize text to speech
   */
  async synthesizeSpeech(text: string, voiceId?: string): Promise<string> {
    try {
      const response = await voiceCommandAPI.synthesize(text, voiceId);
      return response.audioUrl;
    } catch (error) {
      console.error('Speech synthesis failed:', error);
      throw error;
    }
  }

  /**
   * Get available voices from ElevenLabs
   */
  async getAvailableVoices(): Promise<Voice[]> {
    try {
      const response = await voiceCommandAPI.getVoices();
      return response.voices.map(v => ({
        id: v.voice_id,
        name: v.name,
        category: v.category,
        description: v.description,
        previewUrl: v.preview_url,
      }));
    } catch (error) {
      console.error('Failed to fetch voices:', error);
      return [];
    }
  }

  /**
   * Play audio response
   * Note: Actual implementation will depend on the audio library used
   * (e.g., expo-av, react-native-sound, etc.)
   */
  async playAudioResponse(audioUrl: string): Promise<void> {
    try {
      console.log('Playing audio from:', audioUrl);
      // TODO: Implement actual audio playback using expo-av or similar
      // For now, this is a placeholder
      // Example with expo-av:
      // const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      // await sound.playAsync();
    } catch (error) {
      console.error('Failed to play audio:', error);
      throw error;
    }
  }

  /**
   * Get command history
   */
  getCommandHistory(): VoiceCommand[] {
    return [...this.commandHistory];
  }

  /**
   * Clear command history
   */
  clearHistory(): void {
    this.commandHistory = [];
  }

  /**
   * Get a specific command by ID
   */
  getCommand(id: string): VoiceCommand | undefined {
    return this.commandHistory.find(cmd => cmd.id === id);
  }

  // ============================================================================
  // PRIVATE METHODS
  // ============================================================================

  private generateCommandId(): string {
    return `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private addToHistory(command: VoiceCommand): void {
    this.commandHistory.unshift(command);

    // Limit history size
    if (this.commandHistory.length > (this.options.maxHistorySize || 50)) {
      this.commandHistory = this.commandHistory.slice(0, this.options.maxHistorySize);
    }
  }

  private updateCommandInHistory(updatedCommand: VoiceCommand): void {
    const index = this.commandHistory.findIndex(cmd => cmd.id === updatedCommand.id);
    if (index !== -1) {
      this.commandHistory[index] = updatedCommand;
    }
  }
}

// Export a singleton instance
export const voiceManager = new VoiceManager();

// Export the class for custom instances
export default VoiceManager;

