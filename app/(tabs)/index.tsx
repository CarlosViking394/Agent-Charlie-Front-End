import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function DashboardHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Glows */}
      <View style={styles.glowTopLeft} />
      <View style={styles.glowBottomRight} />

      <View style={styles.content}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingSubtitle}>Hello, Commander</Text>
          <Text style={styles.greetingTitle}>How can I assist?</Text>
        </View>

        {/* Central Orb */}
        <View style={styles.orbContainer}>
          <View style={styles.orb}>
            <View style={styles.orbRing1} />
            <View style={styles.orbRing2} />
            <Ionicons name="mic" color="#ffffff" size={80} style={styles.micIcon} />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Inventory</Text>
            <Text style={styles.statValue}>
              1,500 <Text style={styles.statUnit}>SKUs</Text>
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Insights</Text>
            <Text style={styles.statValue}>
              +5.2% <Text style={styles.statUnit}>Sales</Text>
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Alerts</Text>
            <Text style={[styles.statValue, styles.statAlert]}>
              2 <Text style={styles.statUnit}>Low Stock</Text>
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Stock Value</Text>
            <Text style={styles.statValue}>$1.2M</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0C14',
    position: 'relative',
  },
  glowTopLeft: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 384,
    height: 384,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: 192,
    opacity: 0.5,
  },
  glowBottomRight: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 384,
    height: 384,
    backgroundColor: 'rgba(255, 0, 170, 0.1)',
    borderRadius: 192,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 100,
    zIndex: 10,
  },
  greeting: {
    alignItems: 'center',
    marginBottom: 32,
  },
  greetingSubtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  greetingTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  orbContainer: {
    width: 256,
    height: 256,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 64,
  },
  orb: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 128,
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  orbRing1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 128,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  orbRing2: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: 115,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  micIcon: {
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 448,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(10, 15, 25, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statUnit: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  statAlert: {
    color: '#ef4444',
  },
});
