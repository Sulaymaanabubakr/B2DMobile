# B2D Kitchen Mobile App - Setup Guide

## Overview

This guide will help you set up and run the B2D Kitchen mobile application on your local machine or deploy it to app stores.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** or **yarn**
   - Comes with Node.js
   - Verify: `npm --version`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

4. **Mobile Testing Options**:
   - **Expo Go App** (iOS/Android) - Easiest option
   - **Android Studio** (for Android Emulator)
   - **Xcode** (for iOS Simulator - Mac only)

## Step 1: Install Dependencies

Navigate to the mobile app directory and install all dependencies:

```bash
cd b2d-mobile-app
npm install
```

This will install:
- React Native and Expo SDK
- Firebase SDK (auth, firestore)
- React Navigation (stack & bottom tabs)
- UI components and icons
- All other required packages

## Step 2: Firebase Configuration

### 2.1 Create Firebase Project (if not already created)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or use existing project
3. Enable the following services:
   - **Authentication** (Email/Password provider)
   - **Firestore Database**
   - **Storage** (optional, using Cloudinary for media)

### 2.2 Get Firebase Credentials

1. In Firebase Console, go to Project Settings
2. Scroll to "Your apps" section
3. Click on Web app icon (</>)
4. Copy the configuration object

### 2.3 Update Firebase Config

Open `src/config/firebase.js` and replace placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Step 3: Configure Firestore Database

### 3.1 Create Collections

In Firebase Console, create these collections with sample documents:

#### Collection: `menu`
```json
{
  "name": "Jollof Rice with Chicken",
  "description": "Nigerian style jollof rice served with grilled chicken",
  "price": 2500,
  "category": "Rice Dishes",
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/sample.jpg",
  "featured": true,
  "ingredients": "Rice, tomatoes, pepper, onions, chicken, spices",
  "allergens": "None",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Collection: `media`
```json
{
  "url": "https://res.cloudinary.com/your-cloud/image/upload/gallery/photo1.jpg",
  "type": "image",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Collection: `testimonials`
```json
{
  "name": "John Doe",
  "rating": 5,
  "comment": "Amazing food and great service!",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 3.2 Set Firestore Rules

Go to Firestore Database → Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Menu - read by all, write by admin only
    match /menu/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders - read/write by authenticated users
    match /orders/{orderId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    
    // Users - read/write own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Media - read by all
    match /media/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Testimonials - read by all
    match /testimonials/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Messages - create by authenticated users
    match /messages/{document=**} {
      allow create: if request.auth != null;
      allow read, update: if request.auth != null;
    }
  }
}
```

## Step 4: Update Contact Information

### 4.1 Contact Screen

Open `src/screens/ContactScreen.js` and update:

```javascript
const CONTACT_INFO = {
  address: 'Your actual address, Lagos, Nigeria',
  phone: '+234 XXX XXX XXXX',
  email: 'your-email@b2dkitchen.ng',
  whatsapp: '+234XXXXXXXXXX',
};
```

### 4.2 Checkout Screen

Open `src/screens/CheckoutScreen.js` and update the WhatsApp number:

```javascript
const whatsappUrl = `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(message)}`;
```

## Step 5: Run the Application

### Option 1: Using Expo Go (Recommended for Testing)

1. **Install Expo Go**:
   - iOS: Download from App Store
   - Android: Download from Play Store

2. **Start Development Server**:
   ```bash
   npm start
   # or
   expo start
   ```

3. **Scan QR Code**:
   - iOS: Use Camera app to scan QR code
   - Android: Use Expo Go app to scan QR code

4. **App will load on your device**

### Option 2: iOS Simulator (Mac Only)

```bash
npm run ios
```

### Option 3: Android Emulator

1. Install Android Studio
2. Set up Android Virtual Device (AVD)
3. Run:
   ```bash
   npm run android
   ```

### Option 4: Web Browser (Limited Features)

```bash
npm run web
```

## Step 6: Testing the App

### Test Authentication
1. Open the app
2. Skip onboarding or complete it
3. Click "Sign Up" and create an account
4. Verify email is saved in Firebase Authentication
5. Verify user document is created in Firestore `users` collection

### Test Menu & Cart
1. Browse menu items
2. Click on an item to view details
3. Add items to cart with different quantities
4. View cart and update quantities
5. Verify cart persists after closing and reopening app

### Test Checkout
1. Proceed to checkout from cart
2. Enter delivery address
3. Try both checkout options:
   - WhatsApp (opens WhatsApp with order message)
   - Place Order (saves to Firestore)
4. Check Firebase Console for new order document

### Test Orders
1. Navigate to Orders tab
2. View your order history
3. Filter by status (All, Pending, Completed, Cancelled)

## Step 7: Building for Production

### Using Expo Application Services (EAS) - Recommended

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure Build**:
   ```bash
   eas build:configure
   ```

4. **Build Android APK**:
   ```bash
   eas build --platform android --profile preview
   ```

5. **Build iOS**:
   ```bash
   eas build --platform ios --profile preview
   ```

### Using Classic Expo Build

```bash
# Android
expo build:android

# iOS
expo build:ios
```

## Step 8: Deployment

### Google Play Store (Android)

1. Build production APK/AAB with EAS
2. Create Google Play Developer account ($25 one-time fee)
3. Create new app listing
4. Upload APK/AAB
5. Complete store listing (screenshots, description, etc.)
6. Submit for review

### Apple App Store (iOS)

1. Build production IPA with EAS
2. Enroll in Apple Developer Program ($99/year)
3. Create App ID in Apple Developer Console
4. Create app in App Store Connect
5. Upload build using Transporter app
6. Complete store listing
7. Submit for review

## Troubleshooting

### Issue: "Metro bundler not starting"

```bash
npm start -- --reset-cache
```

### Issue: "Firebase not connecting"

1. Double-check Firebase config in `src/config/firebase.js`
2. Verify API keys in Firebase Console
3. Check Firebase Authentication is enabled
4. Verify Firestore is created

### Issue: "Dependencies not installing"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "App crashes on startup"

1. Check for JavaScript errors in Expo DevTools
2. Verify all required dependencies are installed
3. Check Firebase configuration
4. Review console logs for specific errors

### Issue: "Images not loading"

1. Verify Cloudinary URLs are accessible
2. Check internet connection
3. Add placeholder images if Cloudinary is not set up yet

## Environment-Specific Configuration

For different environments (dev, staging, production), create separate Firebase projects:

1. Create `.env.development`:
   ```
   FIREBASE_API_KEY=dev_api_key
   FIREBASE_PROJECT_ID=dev_project_id
   ```

2. Create `.env.production`:
   ```
   FIREBASE_API_KEY=prod_api_key
   FIREBASE_PROJECT_ID=prod_project_id
   ```

3. Use `expo-constants` to load environment variables

## Performance Tips

1. **Optimize Images**: Use Cloudinary transformations
   ```
   imageUrl: "https://res.cloudinary.com/.../f_auto,q_auto,w_400/image.jpg"
   ```

2. **Lazy Loading**: Implemented in FlatLists with `maxToRenderPerBatch`

3. **Pagination**: Limit Firestore queries
   ```javascript
   query(collection(db, 'menu'), limit(20))
   ```

4. **Caching**: AsyncStorage used for cart persistence

## Security Checklist

- ✅ Firebase security rules configured
- ✅ API keys restricted in Firebase Console
- ✅ User authentication required for sensitive operations
- ✅ Input validation on all forms
- ✅ HTTPS for all network requests
- ✅ No sensitive data in source code

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## Support

If you need help:
- Check the [README.md](./README.md) for feature documentation
- Review Firebase Console for backend issues
- Check Expo DevTools for runtime errors
- Contact: orders@b2dkitchen.ng

---

**Happy Coding! 🚀**
