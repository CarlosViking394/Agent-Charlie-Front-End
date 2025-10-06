import { create } from 'zustand';
import { voiceManager } from '../lib/voice/voiceManager';
import type { VoiceCommand } from '../lib/types/voice.types';

interface CommandStore {
  // State
  commands: VoiceCommand[];
  activeCommand: VoiceCommand | null;
  isExecuting: boolean;
  error: string | null;

  // Actions
  addCommand: (command: VoiceCommand) => void;
  updateCommand: (id: string, updates: Partial<VoiceCommand>) => void;
  removeCommand: (id: string) => void;
  setActiveCommand: (command: VoiceCommand | null) => void;
  clearCommands: () => void;
  setExecuting: (isExecuting: boolean) => void;
  setError: (error: string | null) => void;
  
  // Command execution
  executeTextCommand: (text: string) => Promise<VoiceCommand>;
  executeAudioCommand: (audioUri: string) => Promise<VoiceCommand>;
  
  // Query methods
  getCommandById: (id: string) => VoiceCommand | undefined;
  getRecentCommands: (limit?: number) => VoiceCommand[];
  getCommandsByStatus: (status: VoiceCommand['status']) => VoiceCommand[];
}

export const useCommandStore = create<CommandStore>((set, get) => ({
  // Initial State
  commands: [],
  activeCommand: null,
  isExecuting: false,
  error: null,

  // Actions
  addCommand: (command) => {
    set((state) => ({
      commands: [command, ...state.commands],
    }));
  },

  updateCommand: (id, updates) => {
    set((state) => ({
      commands: state.commands.map((cmd) =>
        cmd.id === id ? { ...cmd, ...updates } : cmd
      ),
    }));
  },

  removeCommand: (id) => {
    set((state) => ({
      commands: state.commands.filter((cmd) => cmd.id !== id),
    }));
  },

  setActiveCommand: (command) => set({ activeCommand: command }),

  clearCommands: () => {
    voiceManager.clearHistory();
    set({ commands: [], activeCommand: null });
  },

  setExecuting: (isExecuting) => set({ isExecuting }),

  setError: (error) => set({ error }),

  // Command Execution
  executeTextCommand: async (text: string) => {
    const { addCommand, updateCommand, setActiveCommand, setExecuting, setError } = get();
    
    try {
      setExecuting(true);
      setError(null);

      const command = await voiceManager.sendTextCommand(text);
      
      addCommand(command);
      setActiveCommand(command);
      
      return command;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to execute command';
      setError(errorMessage);
      throw error;
    } finally {
      setExecuting(false);
    }
  },

  executeAudioCommand: async (audioUri: string) => {
    const { addCommand, updateCommand, setActiveCommand, setExecuting, setError } = get();
    
    try {
      setExecuting(true);
      setError(null);

      const command = await voiceManager.sendAudioCommand(audioUri);
      
      addCommand(command);
      setActiveCommand(command);
      
      return command;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to execute audio command';
      setError(errorMessage);
      throw error;
    } finally {
      setExecuting(false);
    }
  },

  // Query Methods
  getCommandById: (id) => {
    return get().commands.find((cmd) => cmd.id === id);
  },

  getRecentCommands: (limit = 10) => {
    return get().commands.slice(0, limit);
  },

  getCommandsByStatus: (status) => {
    return get().commands.filter((cmd) => cmd.status === status);
  },
}));

