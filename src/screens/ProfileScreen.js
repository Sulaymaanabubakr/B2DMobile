import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

export default function ProfileScreen({ navigation }) {
  const { user, userData, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const menuItems = [
    {
      id: '1',
      icon: 'person-outline',
      label: 'Edit Profile',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: '2',
      icon: 'receipt-outline',
      label: 'My Orders',
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: '3',
      icon: 'images-outline',
      label: 'Gallery',
      onPress: () => navigation.navigate('Gallery'),
    },
    {
      id: '4',
      icon: 'star-outline',
      label: 'Testimonials',
      onPress: () => navigation.navigate('Testimonials'),
    },
    {
      id: '5',
      icon: 'call-outline',
      label: 'Contact Us',
      onPress: () => navigation.navigate('Contact'),
    },
    {
      id: '6',
      icon: 'information-circle-outline',
      label: 'About B2D Kitchen',
      onPress: () => Alert.alert('About', 'B2D Kitchen - Breakfast 2 Dinner\nVersion 1.0.0'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userData?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{userData?.name || 'Guest User'}</Text>
          <Text style={styles.userEmail}>{userData?.email || user?.email}</Text>
          {userData?.phone && (
            <Text style={styles.userPhone}>{userData.phone}</Text>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color={COLORS.primary} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>B2D Kitchen Mobile App</Text>
          <Text style={styles.appInfoText}>Version 1.0.0</Text>
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
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: SIZES.xxxl,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: SIZES.base,
    color: COLORS.text,
    marginLeft: SPACING.md,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: SIZES.md,
    color: COLORS.error,
    fontWeight: 'bold',
    marginLeft: SPACING.sm,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  appInfoText: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
    marginBottom: 4,
  },
});
