import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      // Navigation handled by AppNavigator
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleGuestContinue = () => {
    // Navigate to main app as guest
    // In the real app, you'd handle guest mode differently
    alert('Guest mode - Browse only. Login to place orders.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>B2D KITCHEN</Text>
          <Text style={styles.tagline}>Welcome Back!</Text>
        </View>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => alert('Password reset feature coming soon')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGuestContinue}
            disabled={loading}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              disabled={loading}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logo: {
    fontSize: SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
  },
  formContainer: {
    width: '100%',
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.sm,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: SIZES.base,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    fontSize: SIZES.base,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: SIZES.sm,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  guestButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  guestButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.md,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  signupText: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
  },
  signupLink: {
    fontSize: SIZES.base,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
