import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function CartScreen({ navigation }) {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }}
        style={styles.itemImage}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        {item.spiceLevel && (
          <Text style={styles.itemOption}>Spice: {item.spiceLevel}</Text>
        )}
        <Text style={styles.itemPrice}>₦{item.price?.toLocaleString()}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={100} color={COLORS.border} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>
                ₦{getCartTotal().toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.sm,
  },
  itemInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  itemOption: {
    fontSize: SIZES.xs,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: SIZES.base,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.sm,
    padding: 4,
  },
  quantityButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: SIZES.base,
    fontWeight: 'bold',
    color: COLORS.text,
    marginHorizontal: SPACING.sm,
  },
  removeButton: {
    padding: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: SIZES.lg,
    color: COLORS.textLight,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
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
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: SIZES.lg,
    color: COLORS.text,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
});
