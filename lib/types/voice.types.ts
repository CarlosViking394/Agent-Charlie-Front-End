// ============================================================================
// VOICE RECORDING TYPES
// ============================================================================

export interface VoiceRecording {
  uri: string;
  duration: number;
  size?: number;
  mimeType?: string;
}

export interface VoiceRecordingOptions {
  maxDuration?: number; // in seconds
  sampleRate?: number;
  channels?: number;
  bitRate?: number;
}

// ============================================================================
// VOICE COMMAND TYPES
// ============================================================================

export type VoiceCommandStatus = 
  | 'idle'
  | 'recording'
  | 'processing'
  | 'transcribing'
  | 'executing'
  | 'speaking'
  | 'completed'
  | 'error';

export interface VoiceCommand {
  id: string;
  text: string;
  audioUri?: string;
  timestamp: number;
  status: VoiceCommandStatus;
  response?: string;
  responseAudioUrl?: string;
  error?: string;
  intent?: string;
  entities?: Record<string, any>;
}

// ============================================================================
// VOICE STATE TYPES
// ============================================================================

export interface VoiceState {
  isRecording: boolean;
  isProcessing: boolean;
  isPlaying: boolean;
  currentCommand: VoiceCommand | null;
  commandHistory: VoiceCommand[];
  selectedVoice: Voice | null;
  availableVoices: Voice[];
  error: string | null;
}

export interface Voice {
  id: string;
  name: string;
  category?: string;
  description?: string;
  previewUrl?: string;
}

// ============================================================================
// VOICE MANAGER TYPES
// ============================================================================

export interface VoiceManagerOptions {
  autoPlay?: boolean;
  cacheAudio?: boolean;
  maxHistorySize?: number;
}

export interface AudioPlayerOptions {
  volume?: number;
  loop?: boolean;
  onPlaybackStatusUpdate?: (status: AudioPlaybackStatus) => void;
}

export interface AudioPlaybackStatus {
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  didJustFinish: boolean;
}

// ============================================================================
// WHISPER (SPEECH-TO-TEXT) TYPES
// ============================================================================

export interface WhisperTranscriptionOptions {
  language?: string;
  temperature?: number;
  prompt?: string;
}

export interface WhisperTranscriptionResult {
  text: string;
  language?: string;
  duration?: number;
}

// ============================================================================
// ELEVENLABS (TEXT-TO-SPEECH) TYPES
// ============================================================================

export interface ElevenLabsSynthesisOptions {
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

export interface ElevenLabsSynthesisResult {
  audioUrl: string;
  text: string;
  voiceId?: string;
}

// ============================================================================
// VOICE WAVEFORM TYPES
// ============================================================================

export interface WaveformData {
  samples: number[];
  sampleRate: number;
  duration: number;
}

export interface WaveformVisualizationOptions {
  color?: string;
  backgroundColor?: string;
  barWidth?: number;
  barGap?: number;
  height?: number;
  animate?: boolean;
}

