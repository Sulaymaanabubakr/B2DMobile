import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAEpBPTDR5U9s1ycb6HejR6KR5zWnKWmdY",
  authDomain: "breakfast2dinner-8b241.firebaseapp.com",
  projectId: "breakfast2dinner-8b241",
  storageBucket: "breakfast2dinner-8b241.firebasestorage.app",
  messagingSenderId: "481905595681",
  appId: "1:481905595681:web:461d86cadd367ae8f35a60",
  measurementId: "G-D3HZ6LW8EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
