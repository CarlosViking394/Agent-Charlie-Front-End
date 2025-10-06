import { useState, useCallback, useEffect } from 'react';
import { useVoiceStore } from '../stores/useVoiceStore';
import { useCommandStore } from '../stores/useCommandStore';
import type { VoiceCommand } from '../lib/types/voice.types';

/**
 * Hook for managing voice commands
 * 
 * Provides easy access to voice command functionality:
 * - Recording and sending voice commands
 * - Text-based commands
 * - Command history
 * - Voice selection
 */
export function useVoiceCommand() {
  const {
    isRecording,
    isProcessing,
    isPlaying,
    currentCommand,
    commandHistory,
    selectedVoice,
    availableVoices,
    error,
    setRecording,
    setProcessing,
    setPlaying,
    sendTextCommand,
    sendAudioCommand,
    transcribeAudio,
    synthesizeSpeech,
    loadVoices,
    setSelectedVoice,
    clearHistory,
    setError,
  } = useVoiceStore();

  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  // Load available voices on mount
  useEffect(() => {
    loadVoices();
  }, [loadVoices]);

  /**
   * Start recording audio
   * Note: This is a placeholder - actual implementation will use expo-av or similar
   */
  const startRecording = useCallback(async () => {
    try {
      setRecording(true);
      setError(null);
      
      // TODO: Implement actual audio recording using expo-av
      // Example:
      // const { recording } = await Audio.Recording.createAsync(
      //   Audio.RecordingOptionsPresets.HIGH_QUALITY
      // );
      // setRecordingInstance(recording);
      
      console.log('🎤 Recording started');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start recording';
      setError(errorMessage);
      setRecording(false);
    }
  }, [setRecording, setError]);

  /**
   * Stop recording and process the audio
   */
  const stopRecording = useCallback(async () => {
    try {
      setRecording(false);
      
      // TODO: Implement actual recording stop and get URI
      // Example:
      // await recordingInstance.stopAndUnloadAsync();
      // const uri = recordingInstance.getURI();
      
      const mockUri = 'file://mock-recording.mp3'; // Placeholder
      setRecordingUri(mockUri);
      
      console.log('🎤 Recording stopped');
      
      return mockUri;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to stop recording';
      setError(errorMessage);
      return null;
    }
  }, [setRecording, setError]);

  /**
   * Send a text command
   */
  const sendCommand = useCallback(async (text: string) => {
    try {
      const command = await sendTextCommand(text);
      return command;
    } catch (error) {
      console.error('Failed to send command:', error);
      throw error;
    }
  }, [sendTextCommand]);

  /**
   * Send recorded audio as a command
   */
  const sendRecordedCommand = useCallback(async (audioUri: string) => {
    try {
      const command = await sendAudioCommand(audioUri);
      setRecordingUri(null);
      return command;
    } catch (error) {
      console.error('Failed to send audio command:', error);
      throw error;
    }
  }, [sendAudioCommand]);

  /**
   * Record and send a voice command in one action
   */
  const recordAndSendCommand = useCallback(async () => {
    try {
      // Start recording
      await startRecording();
      
      // Wait for user to stop (this would be triggered by a button press)
      // In a real implementation, you'd have a separate stop button
      
      return true;
    } catch (error) {
      console.error('Failed to record command:', error);
      return false;
    }
  }, [startRecording]);

  /**
   * Get recent commands
   */
  const getRecentCommands = useCallback((limit: number = 10) => {
    return commandHistory.slice(0, limit);
  }, [commandHistory]);

  /**
   * Select a voice for synthesis
   */
  const selectVoice = useCallback((voiceId: string) => {
    const voice = availableVoices.find(v => v.id === voiceId);
    if (voice) {
      setSelectedVoice(voice);
    }
  }, [availableVoices, setSelectedVoice]);

  /**
   * Play a text response as speech
   */
  const speakText = useCallback(async (text: string, voiceId?: string) => {
    try {
      setPlaying(true);
      const audioUrl = await synthesizeSpeech(text, voiceId);
      
      // TODO: Implement actual audio playback
      console.log('🔊 Playing audio:', audioUrl);
      
      return audioUrl;
    } catch (error) {
      console.error('Failed to speak text:', error);
      throw error;
    } finally {
      setPlaying(false);
    }
  }, [synthesizeSpeech, setPlaying]);

  return {
    // State
    isRecording,
    isProcessing,
    isPlaying,
    currentCommand,
    commandHistory,
    selectedVoice,
    availableVoices,
    error,
    recordingUri,

    // Actions
    startRecording,
    stopRecording,
    sendCommand,
    sendRecordedCommand,
    recordAndSendCommand,
    transcribeAudio,
    speakText,
    getRecentCommands,
    selectVoice,
    clearHistory,
    loadVoices,
  };
}

