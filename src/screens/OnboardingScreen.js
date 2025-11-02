import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS, SIZES, SPACING, RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Fresh from Breakfast to Dinner',
    description: 'Enjoy delicious meals prepared fresh daily with premium ingredients',
    icon: '🍳',
  },
  {
    id: '2',
    title: 'Fast Delivery Nationwide',
    description: 'Get your favorite dishes delivered hot and fresh to your doorstep',
    icon: '🚚',
  },
  {
    id: '3',
    title: 'Halal Friendly • Hygienic • 24/7',
    description: 'Quality meals prepared with care, available anytime you need',
    icon: '⭐',
  },
];

export default function OnboardingScreen({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: SPACING.md,
    zIndex: 10,
    padding: SPACING.sm,
  },
  skipText: {
    fontSize: SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  slide: {
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  icon: {
    fontSize: 120,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
});
