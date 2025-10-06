import { voiceCommandAPI } from '../api';
import type { Voice, ElevenLabsSynthesisOptions, ElevenLabsSynthesisResult } from '../types/voice.types';

/**
 * ElevenLabs Integration
 * 
 * This file provides a frontend interface to ElevenLabs text-to-speech.
 * All actual API calls go through the backend for security.
 */

/**
 * Get available voices from ElevenLabs via backend
 */
export async function getVoices(): Promise<Voice[]> {
  try {
    const response = await voiceCommandAPI.getVoices();
    
    return response.voices.map(voice => ({
      id: voice.voice_id,
      name: voice.name,
      category: voice.category,
      description: voice.description,
      previewUrl: voice.preview_url,
    }));
  } catch (error) {
    console.error('Failed to fetch ElevenLabs voices:', error);
    throw error;
  }
}

/**
 * Synthesize text to speech using ElevenLabs via backend
 * Returns a URL to the generated audio file
 */
export async function synthesizeSpeech(
  text: string,
  options?: ElevenLabsSynthesisOptions
): Promise<ElevenLabsSynthesisResult> {
  try {
    const response = await voiceCommandAPI.synthesize(text, options?.voiceId);
    
    return {
      audioUrl: response.audioUrl,
      text: response.text,
      voiceId: response.voiceId,
    };
  } catch (error) {
    console.error('Failed to synthesize speech:', error);
    throw error;
  }
}

/**
 * Get a specific voice by ID
 */
export async function getVoiceById(voiceId: string): Promise<Voice | undefined> {
  const voices = await getVoices();
  return voices.find(voice => voice.id === voiceId);
}

/**
 * Get voice by name (case-insensitive)
 */
export async function getVoiceByName(name: string): Promise<Voice | undefined> {
  const voices = await getVoices();
  const normalizedName = name.toLowerCase();
  return voices.find(voice => voice.name.toLowerCase() === normalizedName);
}

/**
 * Default voice IDs for common use cases
 * These can be customized based on your ElevenLabs account
 */
export const DEFAULT_VOICES = {
  // Professional male voice
  PROFESSIONAL_MALE: '21m00Tcm4TlvDq8ikWAM',
  
  // Professional female voice
  PROFESSIONAL_FEMALE: 'EXAVITQu4vr4xnSDxMaL',
  
  // Friendly voice
  FRIENDLY: 'ThT5KcBeYPX3keUQqHPh',
  
  // British voice
  BRITISH: 'pNInz6obpgDQGcFmaJgB',
} as const;

/**
 * Get a default voice
 */
export function getDefaultVoice(): string {
  return DEFAULT_VOICES.PROFESSIONAL_MALE;
}

/**
 * Preview a voice (if preview URL is available)
 */
export async function previewVoice(voice: Voice): Promise<string | null> {
  return voice.previewUrl || null;
}

