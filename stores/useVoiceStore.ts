import { create } from 'zustand';
import { voiceManager } from '../lib/voice/voiceManager';
import { getVoices } from '../lib/voice/elevenlabs';
import type { VoiceCommand, Voice, VoiceCommandStatus } from '../lib/types/voice.types';

interface VoiceStore {
  // State
  isRecording: boolean;
  isProcessing: boolean;
  isPlaying: boolean;
  currentCommand: VoiceCommand | null;
  commandHistory: VoiceCommand[];
  selectedVoice: Voice | null;
  availableVoices: Voice[];
  error: string | null;

  // Actions
  setRecording: (isRecording: boolean) => void;
  setProcessing: (isProcessing: boolean) => void;
  setPlaying: (isPlaying: boolean) => void;
  setCurrentCommand: (command: VoiceCommand | null) => void;
  addCommandToHistory: (command: VoiceCommand) => void;
  updateCommandInHistory: (command: VoiceCommand) => void;
  clearHistory: () => void;
  setSelectedVoice: (voice: Voice | null) => void;
  loadVoices: () => Promise<void>;
  setError: (error: string | null) => void;
  
  // Command actions
  sendTextCommand: (text: string) => Promise<VoiceCommand>;
  sendAudioCommand: (audioUri: string) => Promise<VoiceCommand>;
  transcribeAudio: (audioUri: string) => Promise<string>;
  synthesizeSpeech: (text: string, voiceId?: string) => Promise<string>;
}

export const useVoiceStore = create<VoiceStore>((set, get) => ({
  // Initial State
  isRecording: false,
  isProcessing: false,
  isPlaying: false,
  currentCommand: null,
  commandHistory: [],
  selectedVoice: null,
  availableVoices: [],
  error: null,

  // Actions
  setRecording: (isRecording) => set({ isRecording }),
  
  setProcessing: (isProcessing) => set({ isProcessing }),
  
  setPlaying: (isPlaying) => set({ isPlaying }),
  
  setCurrentCommand: (command) => set({ currentCommand: command }),
  
  addCommandToHistory: (command) => {
    set((state) => ({
      commandHistory: [command, ...state.commandHistory],
    }));
  },
  
  updateCommandInHistory: (updatedCommand) => {
    set((state) => ({
      commandHistory: state.commandHistory.map((cmd) =>
        cmd.id === updatedCommand.id ? updatedCommand : cmd
      ),
    }));
  },
  
  clearHistory: () => {
    voiceManager.clearHistory();
    set({ commandHistory: [] });
  },
  
  setSelectedVoice: (voice) => set({ selectedVoice: voice }),
  
  loadVoices: async () => {
    try {
      const voices = await getVoices();
      set({ availableVoices: voices, error: null });
      
      // Set default voice if none selected
      if (!get().selectedVoice && voices.length > 0) {
        set({ selectedVoice: voices[0] });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load voices';
      set({ error: errorMessage });
      console.error('Failed to load voices:', error);
    }
  },
  
  setError: (error) => set({ error }),

  // Command Actions
  sendTextCommand: async (text: string) => {
    const { setProcessing, setCurrentCommand, addCommandToHistory, updateCommandInHistory, setError } = get();
    
    try {
      setProcessing(true);
      setError(null);
      
      const command = await voiceManager.sendTextCommand(text);
      
      setCurrentCommand(command);
      addCommandToHistory(command);
      
      return command;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send command';
      setError(errorMessage);
      throw error;
    } finally {
      setProcessing(false);
    }
  },

  sendAudioCommand: async (audioUri: string) => {
    const { setProcessing, setCurrentCommand, addCommandToHistory, updateCommandInHistory, setError } = get();
    
    try {
      setProcessing(true);
      setError(null);
      
      const command = await voiceManager.sendAudioCommand(audioUri);
      
      setCurrentCommand(command);
      addCommandToHistory(command);
      
      return command;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send audio command';
      setError(errorMessage);
      throw error;
    } finally {
      setProcessing(false);
    }
  },

  transcribeAudio: async (audioUri: string) => {
    const { setProcessing, setError } = get();
    
    try {
      setProcessing(true);
      setError(null);
      
      const text = await voiceManager.transcribeAudio(audioUri);
      
      return text;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to transcribe audio';
      setError(errorMessage);
      throw error;
    } finally {
      setProcessing(false);
    }
  },

  synthesizeSpeech: async (text: string, voiceId?: string) => {
    const { setProcessing, setError, selectedVoice } = get();
    
    try {
      setProcessing(true);
      setError(null);
      
      const voice = voiceId || selectedVoice?.id;
      const audioUrl = await voiceManager.synthesizeSpeech(text, voice);
      
      return audioUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to synthesize speech';
      setError(errorMessage);
      throw error;
    } finally {
      setProcessing(false);
    }
  },
}));

