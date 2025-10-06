import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const onboardingSteps = [
  {
    title: 'Welcome to the Future of Inventory Management',
    description: 'Meet your new AI assistant, designed to streamline your inventory with voice commands and predictive analytics. Let\'s get you set up.',
  },
  {
    title: 'Voice-Powered Control',
    description: 'Use natural language commands to manage your inventory. Just speak, and let AI do the rest.',
  },
  {
    title: 'Predictive Analytics',
    description: 'Get AI-powered insights and forecasts to optimize your stock levels and reduce waste.',
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Track your inventory in real-time with instant alerts and notifications.',
  },
  {
    title: 'Smart Automation',
    description: 'Automate reordering, stock tracking, and reporting with intelligent workflows.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep ? styles.progressDotActive : styles.progressDotInactive,
              ]}
            />
          ))}
        </View>

        {/* Content */}
        <View style={styles.contentCenter}>
          {/* Animated Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.soundWave}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.soundWaveDot} />
              ))}
            </View>
          </View>

          <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
          <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep < onboardingSteps.length - 1 ? 'Next' : 'Get Started'}
            </Text>
          </TouchableOpacity>
          {currentStep < onboardingSteps.length - 1 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressDotActive: {
    backgroundColor: '#00FFFF',
  },
  progressDotInactive: {
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: 48,
  },
  soundWave: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  soundWaveDot: {
    width: 4,
    height: 4,
    backgroundColor: '#00FFFF',
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F0F0F0',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 24,
    maxWidth: 400,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#00FFFF',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#0D1B2A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  skipButtonText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
