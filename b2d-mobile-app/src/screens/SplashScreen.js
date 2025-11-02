import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { COLORS, SIZES, SPACING } from '../constants/theme';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.logo}>B2D KITCHEN</Text>
        <Text style={styles.tagline}>Breakfast 2 Dinner</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: SIZES.xxxl + 8,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: SIZES.md,
    color: COLORS.accent,
    marginTop: SPACING.sm,
    letterSpacing: 1,
  },
});
