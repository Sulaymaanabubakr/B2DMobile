import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { userData } = useAuth();
  const { getCartCount } = useCart();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadFeaturedItems(), loadCategories()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const loadFeaturedItems = async () => {
    try {
      const q = query(
        collection(db, 'menu'),
        where('featured', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeaturedItems(items);
    } catch (error) {
      console.error('Error loading featured items:', error);
    }
  };

  const loadCategories = async () => {
    const cats = [
      { id: '1', name: 'Breakfast', icon: '🍳' },
      { id: '2', name: 'Swallow & Soups', icon: '🍲' },
      { id: '3', name: 'Rice Dishes', icon: '🍚' },
      { id: '4', name: 'Pastries', icon: '🥐' },
      { id: '5', name: 'Proteins', icon: '🍖' },
      { id: '6', name: 'Sides', icon: '🥗' },
      { id: '7', name: 'Drinks', icon: '🥤' },
    ];
    setCategories(cats);
  };

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => navigation.navigate('MenuDetail', { item })}
    >
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/300x200' }}
        style={styles.featuredImage}
      />
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.featuredPrice}>₦{item.price?.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('Menu', { category: item.name })}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {userData?.name || 'Guest'}!</Text>
          <Text style={styles.subtitle}>What would you like to order?</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
          {getCartCount() > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{getCartCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Menu')}
        >
          <Ionicons name="search-outline" size={20} color={COLORS.textLight} />
          <Text style={styles.searchPlaceholder}>Search for dishes...</Text>
        </TouchableOpacity>

        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Dishes</Text>
            <FlatList
              data={featuredItems}
              renderItem={renderFeaturedItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Menu')}
            >
              <Ionicons name="restaurant" size={32} color={COLORS.primary} />
              <Text style={styles.actionText}>View Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Orders')}
            >
              <Ionicons name="receipt" size={32} color={COLORS.primary} />
              <Text style={styles.actionText}>My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Gallery')}
            >
              <Ionicons name="images" size={32} color={COLORS.primary} />
              <Text style={styles.actionText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Contact')}
            >
              <Ionicons name="call" size={32} color={COLORS.primary} />
              <Text style={styles.actionText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Testimonials Preview */}
        <TouchableOpacity
          style={styles.testimonialsCard}
          onPress={() => navigation.navigate('Testimonials')}
        >
          <View style={styles.testimonialsContent}>
            <Ionicons name="star" size={32} color={COLORS.primary} />
            <View style={styles.testimonialsText}>
              <Text style={styles.testimonialsTitle}>Customer Reviews</Text>
              <Text style={styles.testimonialsSubtitle}>
                See what our customers say about us
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
          </View>
        </TouchableOpacity>
      </ScrollView>
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
  greeting: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
    marginTop: 2,
  },
  cartButton: {
    position: 'relative',
    padding: SPACING.sm,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.round,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: SIZES.xs,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchPlaceholder: {
    marginLeft: SPACING.sm,
    color: COLORS.textLight,
    fontSize: SIZES.base,
  },
  section: {
    marginTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  featuredCard: {
    width: width * 0.7,
    marginLeft: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  featuredInfo: {
    padding: SPACING.sm,
  },
  featuredName: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  featuredPrice: {
    fontSize: SIZES.base,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 4,
  },
  categoryCard: {
    alignItems: 'center',
    marginLeft: SPACING.md,
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    minWidth: 100,
    ...SHADOWS.small,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: SPACING.xs,
  },
  categoryName: {
    fontSize: SIZES.sm,
    color: COLORS.text,
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  actionCard: {
    width: (width - SPACING.md * 3) / 2,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  actionText: {
    fontSize: SIZES.base,
    color: COLORS.text,
    marginTop: SPACING.sm,
    fontWeight: '600',
  },
  testimonialsCard: {
    margin: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.medium,
  },
  testimonialsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialsText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  testimonialsTitle: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  testimonialsSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
    marginTop: 2,
  },
});
