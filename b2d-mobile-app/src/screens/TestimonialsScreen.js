import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function TestimonialsScreen({ navigation }) {
  const [testimonials, setTestimonials] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'testimonials'));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(items);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTestimonials();
    setRefreshing(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color={COLORS.primary}
      />
    ));
  };

  const renderTestimonial = ({ item }) => (
    <View style={styles.testimonialCard}>
      <View style={styles.testimonialHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.testimonialInfo}>
          <Text style={styles.testimonialName}>{item.name}</Text>
          <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        </View>
      </View>
      <Text style={styles.testimonialText}>{item.comment}</Text>
      <Text style={styles.testimonialDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Testimonials</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={testimonials}
        renderItem={renderTestimonial}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyText}>No testimonials yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  listContainer: {
    padding: SPACING.md,
  },
  testimonialCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  testimonialInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  testimonialName: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  testimonialText: {
    fontSize: SIZES.base,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  testimonialDate: {
    fontSize: SIZES.xs,
    color: COLORS.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
    marginTop: SPACING.md,
  },
});
