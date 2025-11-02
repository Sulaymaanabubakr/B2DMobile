import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function MenuDetailScreen({ navigation, route }) {
  const { item } = route.params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      quantity,
      spiceLevel,
    };
    addToCart(cartItem);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigation.goBack();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl || 'https://via.placeholder.com/400' }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Details */}
        <View style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₦{item.price?.toLocaleString()}</Text>

          <Text style={styles.description}>{item.description}</Text>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Spice Level */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spice Level</Text>
            <View style={styles.spiceLevelContainer}>
              {['Mild', 'Medium', 'Hot'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.spiceLevelButton,
                    spiceLevel === level && styles.spiceLevelButtonActive,
                  ]}
                  onPress={() => setSpiceLevel(level)}
                >
                  <Text
                    style={[
                      styles.spiceLevelText,
                      spiceLevel === level && styles.spiceLevelTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Ingredients */}
          {item.ingredients && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.ingredientsText}>{item.ingredients}</Text>
            </View>
          )}

          {/* Allergens */}
          {item.allergens && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Allergens</Text>
              <Text style={styles.allergensText}>{item.allergens}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            ₦{(item.price * quantity).toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart" size={20} color={COLORS.white} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={64} color={COLORS.success} />
            <Text style={styles.modalText}>Added to Cart!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: SPACING.xl,
    left: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: RADIUS.round,
    padding: SPACING.sm,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
  },
  quantityText: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.lg,
  },
  spiceLevelContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  spiceLevelButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  spiceLevelButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  spiceLevelText: {
    fontSize: SIZES.base,
    color: COLORS.text,
  },
  spiceLevelTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  ingredientsText: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
    lineHeight: 22,
  },
  allergensText: {
    fontSize: SIZES.base,
    color: COLORS.error,
    lineHeight: 22,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    ...SHADOWS.large,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  totalLabel: {
    fontSize: SIZES.md,
    color: COLORS.textLight,
  },
  totalPrice: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  modalText: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
});
