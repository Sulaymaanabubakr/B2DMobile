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
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, SIZES, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const CONTACT_INFO = {
  address: 'Lagos, Nigeria',
  phone: '+234 000 000 0000',
  email: 'orders@b2dkitchen.ng',
  whatsapp: '+2340000000000',
};

export default function ContactScreen({ navigation }) {
  const { user, userData } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCall = () => {
    Linking.openURL(`tel:${CONTACT_INFO.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_INFO.email}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(`https://wa.me/${CONTACT_INFO.whatsapp}`);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        userId: user?.uid,
        userName: userData?.name,
        userEmail: userData?.email,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: 'unread',
      });

      Alert.alert('Success', 'Your message has been sent!');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
      console.error('Message error:', error);
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
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Contact Cards */}
        <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
          <View style={styles.iconContainer}>
            <Ionicons name="call" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>{CONTACT_INFO.phone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{CONTACT_INFO.email}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={handleWhatsApp}>
          <View style={styles.iconContainer}>
            <Ionicons name="logo-whatsapp" size={24} color={COLORS.success} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>WhatsApp</Text>
            <Text style={styles.contactValue}>{CONTACT_INFO.phone}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
        </TouchableOpacity>

        <View style={styles.contactCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>{CONTACT_INFO.address}</Text>
          </View>
        </View>

        {/* Message Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Type your message here..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={[styles.sendButton, loading && styles.buttonDisabled]}
            onPress={handleSendMessage}
            disabled={loading}
          >
            <Text style={styles.sendButtonText}>
              {loading ? 'Sending...' : 'Send Message'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Operating Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operating Hours</Text>
          <View style={styles.hoursCard}>
            <Text style={styles.hoursText}>Monday - Sunday</Text>
            <Text style={styles.hoursValue}>24/7 Service</Text>
          </View>
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
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: SIZES.sm,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: SIZES.base,
    fontWeight: '600',
    color: COLORS.text,
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
  messageInput: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    fontSize: SIZES.base,
    minHeight: 120,
    marginBottom: SPACING.md,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
  hoursCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },
  hoursText: {
    fontSize: SIZES.base,
    color: COLORS.text,
  },
  hoursValue: {
    fontSize: SIZES.base,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
