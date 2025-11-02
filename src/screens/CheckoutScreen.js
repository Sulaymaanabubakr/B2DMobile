import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, userData } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWhatsAppOrder = () => {
    const orderText = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} x${item.quantity} — ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n\n');

    const message = `Hello B2D Kitchen! I'd like to place an order:\n\n${orderText}\n\nTotal: ₦${getCartTotal().toLocaleString()}\n\nPickup at: ${
      deliveryAddress || '[address or request delivery]'
    }`;

    const whatsappUrl = `https://wa.me/2340000000000?text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(whatsappUrl);
  };

  const handleFirebaseOrder = async () => {
    if (!deliveryAddress) {
      Alert.alert('Error', 'Please enter delivery address');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: user.uid,
        userName: userData?.name,
        userEmail: userData?.email,
        userPhone: userData?.phone,
        items: cartItems,
        total: getCartTotal(),
        deliveryAddress,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      Alert.alert(
        'Success',
        'Your order has been placed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('Orders');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
      console.error('Order error:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item, index) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.orderItemName}>
                {index + 1}. {item.name} x{item.quantity}
              </Text>
              <Text style={styles.orderItemPrice}>
                ₦{(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>
              ₦{getCartTotal().toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your delivery address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.infoText}>Name: {userData?.name}</Text>
          <Text style={styles.infoText}>Email: {userData?.email}</Text>
          <Text style={styles.infoText}>Phone: {userData?.phone}</Text>
        </View>

        {/* Payment Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>
          
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handleWhatsAppOrder}
          >
            <View style={styles.paymentButtonContent}>
              <Ionicons name="logo-whatsapp" size={24} color={COLORS.success} />
              <View style={styles.paymentButtonText}>
                <Text style={styles.paymentButtonTitle}>Order via WhatsApp</Text>
                <Text style={styles.paymentButtonSubtitle}>
                  Send order to WhatsApp for confirmation
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentButton}
            onPress={handleFirebaseOrder}
            disabled={loading}
          >
            <View style={styles.paymentButtonContent}>
              <Ionicons name="cart" size={24} color={COLORS.primary} />
              <View style={styles.paymentButtonText}>
                <Text style={styles.paymentButtonTitle}>Place Order</Text>
                <Text style={styles.paymentButtonSubtitle}>
                  Submit order through app (Pay on delivery)
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.md,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  sectionTitle: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  orderItemName: {
    flex: 1,
    fontSize: SIZES.base,
    color: COLORS.text,
  },
  orderItemPrice: {
    fontSize: SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalPrice: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    fontSize: SIZES.base,
    textAlignVertical: 'top',
  },
  infoText: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentButtonText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  paymentButtonTitle: {
    fontSize: SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  paymentButtonSubtitle: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
    marginTop: 2,
  },
});
