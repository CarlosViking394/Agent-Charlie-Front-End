import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, containerStyles, logoStyles, textStyles, inputStyles, buttonStyles, alertStyles } from '@/theme';

// Hardcoded test user credentials
const TEST_USER = {
  email: 'admin@agentcharlie.com',
  password: 'admin123'
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    // Check credentials
    if (email === TEST_USER.email && password === TEST_USER.password) {
      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to main app
        router.replace('/(tabs)');
      }, 500);
    } else {
      setTimeout(() => {
        setError('Invalid email or password');
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <View style={containerStyles.container}>
      {/* Animated Background */}
      <View style={containerStyles.backgroundOverlay} />

      <View style={containerStyles.content}>
        <View style={logoStyles.logoContainer}>
          <Ionicons name="layers" color={colors.primary} size={48} />
        </View>

        <Text style={textStyles.title}>Welcome Back</Text>

        {/* Demo Credentials Info */}
        <View style={alertStyles.demoInfo}>
          <Text style={textStyles.demoTitle}>Demo Credentials:</Text>
          <Text style={textStyles.demoText}>Email: admin@agentcharlie.com</Text>
          <Text style={textStyles.demoText}>Password: admin123</Text>
        </View>

        <View style={inputStyles.formContainer}>
          <View style={inputStyles.inputContainer}>
            <Text style={textStyles.label}>Email</Text>
            <TextInput
              style={inputStyles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View style={inputStyles.inputContainer}>
            <Text style={textStyles.label}>Password</Text>
            <TextInput
              style={inputStyles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry
              editable={!isLoading}
              onSubmitEditing={handleLogin}
            />
          </View>

          {error ? (
            <View style={alertStyles.errorContainer}>
              <Ionicons name="alert-circle" color={colors.error} size={16} />
              <Text style={textStyles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[buttonStyles.primary, isLoading && buttonStyles.primaryDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={buttonStyles.primaryText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={isLoading}>
            <Text style={textStyles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
