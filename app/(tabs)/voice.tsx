import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const quickCommands = [
  'Check Stock',
  'Add Item',
  'Find Product',
  'Generate Report',
  'Scan Barcode',
];

const conversationHistory = [
  {
    type: 'user',
    message: 'What\'s the current stock of blue widgets?',
  },
  {
    type: 'assistant',
    message: 'There are 250 blue widgets in stock.',
  },
];

export default function VoiceCommandScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(true);
  const [currentCommand, setCurrentCommand] = useState('"Add 50 units of product SKU 12345 to warehouse B."');

  return (
    <View style={styles.container}>
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
          <Text style={styles.currentCommand}>{currentCommand}</Text>

          {/* Waveform Visualization */}
          <View style={styles.waveformContainer}>
            <View style={styles.waveformPlaceholder}>
              <Text style={styles.waveformText}>Voice Waveform</Text>
            </View>
          </View>

          <Text style={styles.listeningText}>{isListening ? 'Listening...' : 'Tap to speak'}</Text>

          {/* Mic Button */}
          <TouchableOpacity
            style={styles.micButton}
            onPress={() => setIsListening(!isListening)}
            activeOpacity={0.8}
          >
            <Mic color="#ffffff" size={40} />
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
              <TouchableOpacity key={index} style={styles.quickCommandChip}>
                <Text style={styles.quickCommandText}>{command}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Conversation History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>History</Text>
          <View style={styles.historyList}>
            {conversationHistory.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.historyItem,
                  item.type === 'user' ? styles.historyItemUser : styles.historyItemAssistant,
                ]}
              >
                <Text style={styles.historyItemLabel}>
                  {item.type === 'user' ? 'You' : 'AI Assistant'}
                </Text>
                <Text style={styles.historyItemMessage}>{item.message}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
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
  },
  waveformText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  listeningText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 24,
  },
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#13a4ec',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#13a4ec',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
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
