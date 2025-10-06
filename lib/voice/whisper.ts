import { voiceCommandAPI } from '../api';
import type { WhisperTranscriptionOptions, WhisperTranscriptionResult } from '../types/voice.types';

/**
 * Whisper Integration
 * 
 * This file provides a frontend interface to OpenAI's Whisper speech-to-text.
 * All actual API calls go through the backend for security.
 */

/**
 * Transcribe audio to text using Whisper via backend
 * 
 * @param audioUri - URI of the audio file to transcribe
 * @param options - Optional transcription settings
 * @returns Transcribed text and metadata
 */
export async function transcribeAudio(
  audioUri: string,
  options?: WhisperTranscriptionOptions
): Promise<WhisperTranscriptionResult> {
  try {
    const response = await voiceCommandAPI.transcribe(audioUri);
    
    return {
      text: response.text,
      language: response.language,
      duration: response.duration,
    };
  } catch (error) {
    console.error('Failed to transcribe audio:', error);
    throw error;
  }
}

/**
 * Validate audio file for transcription
 * Checks file size, format, and duration constraints
 */
export function validateAudioFile(audioUri: string): { valid: boolean; error?: string } {
  // Basic validation - can be expanded based on requirements
  if (!audioUri) {
    return { valid: false, error: 'Audio URI is required' };
  }

  // Check file extension
  const supportedFormats = ['.mp3', '.mp4', '.mpeg', '.mpga', '.m4a', '.wav', '.webm'];
  const hasValidExtension = supportedFormats.some(ext => audioUri.toLowerCase().endsWith(ext));
  
  if (!hasValidExtension) {
    return {
      valid: false,
      error: `Unsupported audio format. Supported formats: ${supportedFormats.join(', ')}`,
    };
  }

  return { valid: true };
}

/**
 * Supported audio formats for Whisper
 */
export const SUPPORTED_AUDIO_FORMATS = [
  'mp3',
  'mp4',
  'mpeg',
  'mpga',
  'm4a',
  'wav',
  'webm',
] as const;

/**
 * Maximum file size for transcription (25 MB as per OpenAI limits)
 */
export const MAX_AUDIO_FILE_SIZE = 25 * 1024 * 1024; // 25 MB in bytes

/**
 * Supported languages for transcription
 * Full list: https://github.com/openai/whisper#available-models-and-languages
 */
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  nl: 'Dutch',
  ru: 'Russian',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  ar: 'Arabic',
  hi: 'Hindi',
  // Add more as needed
} as const;

/**
 * Get language name from code
 */
export function getLanguageName(code: string): string {
  return SUPPORTED_LANGUAGES[code as keyof typeof SUPPORTED_LANGUAGES] || code;
}

/**
 * Detect if audio contains speech
 * This is a placeholder - actual implementation would require audio analysis
 */
export async function detectSpeech(audioUri: string): Promise<boolean> {
  // TODO: Implement actual speech detection using audio analysis
  // For now, we'll just validate the file exists
  return validateAudioFile(audioUri).valid;
}

