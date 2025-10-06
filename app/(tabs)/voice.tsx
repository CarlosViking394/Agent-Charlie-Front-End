import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { useVoiceStore } from '../../stores/useVoiceStore';

const quickCommands = [
  'Check Stock',
  'Low Stock Items',
  'Add Item',
  'Find Product',
  'Inventory Stats',
];

export default function VoiceCommandScreen() {
  const router = useRouter();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const {
    isRecording,
    isProcessing,
    isPlaying,
    currentCommand,
    commandHistory,
    error,
    setRecording: setIsRecording,
    sendTextCommand,
    sendAudioCommand,
    setError,
  } = useVoiceStore();

  const [displayText, setDisplayText] = useState('Tap the microphone to speak');

  // Request audio permissions on mount
  useEffect(() => {
    (async () => {
      if (permissionResponse?.status !== 'granted') {
        await requestPermission();
      }
      
      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  // Update display text based on current command
  useEffect(() => {
    if (isRecording) {
      setDisplayText('Listening... Speak now');
    } else if (isProcessing) {
      setDisplayText('Processing your command...');
    } else if (currentCommand?.text) {
      setDisplayText(`"${currentCommand.text}"`);
    } else {
      setDisplayText('Tap the microphone to speak');
    }
  }, [isRecording, isProcessing, currentCommand]);

  // Start recording
  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant microphone access to use voice commands.');
        await requestPermission();
        return;
      }

      setError(null);
      setIsRecording(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(newRecording);
      console.log('🎤 Recording started');
    } catch (err) {
      console.error('Failed to start recording:', err);
      setError('Failed to start recording');
      setIsRecording(false);
    }
  };

  // Stop recording and process
  const stopRecording = async () => {
    if (!recording) return;

    try {
      console.log('🎤 Stopping recording...');
      setIsRecording(false);
      
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        console.log('📁 Recording saved to:', uri);
        
        // Send to backend for processing
        try {
          const result = await sendAudioCommand(uri);
          console.log('✅ Command processed:', result);
          
          // Play response audio if available
          if (result.responseAudioUrl) {
            await playSound(result.responseAudioUrl);
          }
        } catch (error) {
          console.error('Failed to process command:', error);
          Alert.alert('Error', 'Failed to process voice command. Please try again.');
        }
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
      setError('Failed to stop recording');
    }
  };

  // Toggle recording
  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  // Handle quick command
  const handleQuickCommand = async (command: string) => {
    try {
      setDisplayText(`"${command}"`);
      const result = await sendTextCommand(command);
      console.log('✅ Quick command result:', result);
      
      // Play response audio if available
      if (result.responseAudioUrl) {
        await playSound(result.responseAudioUrl);
      }
    } catch (error) {
      console.error('Quick command failed:', error);
      Alert.alert('Error', 'Failed to process command. Please try again.');
    }
  };

  // Play audio response
  const playSound = async (audioUrl: string) => {
    try {
      console.log('🔊 Loading sound from:', audioUrl);
      
      // Unload previous sound if exists
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      
      setSound(newSound);

      // Cleanup when finished
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          newSound.unloadAsync();
          setSound(null);
        }
      });

      console.log('🔊 Playing response');
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recording?.stopAndUnloadAsync();
      sound?.unloadAsync();
    };
  }, [recording, sound]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Command</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Voice Input Section */}
        <View style={styles.voiceSection}>
          <Text style={styles.currentCommand}>{displayText}</Text>

          {/* Waveform Visualization */}
          <View style={styles.waveformContainer}>
            <View style={[
              styles.waveformPlaceholder,
              isRecording && styles.waveformActive
            ]}>
              {isProcessing || isPlaying ? (
                <ActivityIndicator size="large" color="#13a4ec" />
              ) : (
                <>
                  <Ionicons 
                    name={isRecording ? "mic" : "mic-outline"} 
                    size={60} 
                    color={isRecording ? "#13a4ec" : "rgba(255, 255, 255, 0.3)"} 
                  />
                  {isRecording && (
                    <Text style={styles.recordingPulse}>●</Text>
                  )}
                </>
              )}
            </View>
          </View>

          <Text style={styles.listeningText}>
            {isRecording ? '🎤 Listening...' : 
             isProcessing ? '⚙️ Processing...' :
             isPlaying ? '🔊 Playing response...' :
             'Tap to speak'}
          </Text>

          {/* Error Display */}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          {/* Response Display */}
          {currentCommand?.response && !isRecording && !isProcessing && (
            <View style={styles.responseBox}>
              <Text style={styles.responseLabel}>Response:</Text>
              <Text style={styles.responseText}>{currentCommand.response}</Text>
            </View>
          )}

          {/* Mic Button */}
          <TouchableOpacity
            style={[
              styles.micButton,
              isRecording && styles.micButtonActive,
              (isProcessing || isPlaying) && styles.micButtonDisabled
            ]}
            onPress={toggleRecording}
            activeOpacity={0.8}
            disabled={isProcessing || isPlaying}
          >
            {isProcessing || isPlaying ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <Ionicons 
                name={isRecording ? "stop" : "mic"} 
                color="#ffffff" 
                size={40} 
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Quick Commands */}
        <View style={styles.quickCommandsSection}>
          <Text style={styles.sectionTitle}>Quick Commands</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickCommandsScroll}
          >
            {quickCommands.map((command, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickCommandChip}
                onPress={() => handleQuickCommand(command)}
                disabled={isProcessing || isRecording}
              >
                <Text style={styles.quickCommandText}>{command}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Conversation History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>History</Text>
          {commandHistory.length === 0 ? (
            <Text style={styles.emptyHistoryText}>No commands yet. Tap the microphone to start!</Text>
          ) : (
            <View style={styles.historyList}>
              {commandHistory.slice(0, 10).map((cmd: any) => (
                <View key={cmd.id}>
                  {/* User message */}
                  {cmd.text && (
                    <View style={[styles.historyItem, styles.historyItemUser]}>
                      <Text style={styles.historyItemLabel}>You</Text>
                      <Text style={styles.historyItemMessage}>{cmd.text}</Text>
                    </View>
                  )}
                  {/* Assistant response */}
                  {cmd.response && (
                    <View style={[styles.historyItem, styles.historyItemAssistant]}>
                      <Text style={styles.historyItemLabel}>AI Assistant</Text>
                      <Text style={styles.historyItemMessage}>{cmd.response}</Text>
                      {cmd.responseAudioUrl && (
                        <TouchableOpacity 
                          style={styles.playButton}
                          onPress={() => playSound(cmd.responseAudioUrl!)}
                        >
                          <Ionicons name="play-circle" size={24} color="#13a4ec" />
                          <Text style={styles.playButtonText}>Play response</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  voiceSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  currentCommand: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  waveformContainer: {
    width: '100%',
    aspectRatio: 3 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  waveformPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(19, 164, 236, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  waveformActive: {
    backgroundColor: 'rgba(19, 164, 236, 0.2)',
  },
  waveformText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  recordingPulse: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 24,
    color: '#ff0000',
  },
  listeningText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 24,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#13a4ec',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#13a4ec',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  micButtonActive: {
    backgroundColor: '#ff4444',
    shadowColor: '#ff4444',
  },
  micButtonDisabled: {
    backgroundColor: '#666666',
    shadowOpacity: 0.3,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  responseBox: {
    backgroundColor: 'rgba(19, 164, 236, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
  },
  responseLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  responseText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  playButtonText: {
    fontSize: 14,
    color: '#13a4ec',
  },
  emptyHistoryText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  quickCommandsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  quickCommandsScroll: {
    gap: 12,
    paddingVertical: 12,
  },
  quickCommandChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  quickCommandText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  historySection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  historyList: {
    gap: 16,
    marginTop: 12,
  },
  historyItem: {
    borderRadius: 8,
    padding: 16,
  },
  historyItemUser: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  historyItemAssistant: {
    backgroundColor: 'rgba(19, 164, 236, 0.1)',
  },
  historyItemLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  historyItemMessage: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 40,
  },
});
