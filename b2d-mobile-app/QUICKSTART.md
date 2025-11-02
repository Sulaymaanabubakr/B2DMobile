# B2D Kitchen Mobile App - Quick Start

## For Developers - 5 Minutes to Running App

### 1. Install and Run (2 minutes)

```bash
# Navigate to app directory
cd b2d-mobile-app

# Install dependencies
npm install

# Start the app
npm start
```

### 2. Scan QR Code (1 minute)

- Install **Expo Go** on your phone (App Store or Play Store)
- Scan the QR code shown in terminal or browser
- App will load on your device

### 3. Test the App (2 minutes)

1. **Skip or complete onboarding**
2. **Sign up** with any email (test@example.com works)
3. **Browse menu** (sample data or connect Firebase)
4. **Add items to cart**
5. **View cart and checkout**

## Before Production Use

### Required Configuration

**File: `src/config/firebase.js`**
```javascript
// Replace these with your Firebase credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // From Firebase Console
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**File: `src/screens/ContactScreen.js`**
```javascript
// Update with your contact information
const CONTACT_INFO = {
  address: 'Your Address, Lagos, Nigeria',
  phone: '+234 XXX XXX XXXX',
  email: 'your-email@b2dkitchen.ng',
  whatsapp: '+234XXXXXXXXXX',
};
```

**File: `src/screens/CheckoutScreen.js`**
```javascript
// Update WhatsApp number in handleWhatsAppOrder function
const whatsappUrl = `https://wa.me/234XXXXXXXXXX?text=...`;
```

## Firebase Setup (Required for Full Functionality)

### 1. Create Firebase Project
- Go to https://console.firebase.google.com/
- Create new project
- Enable Authentication (Email/Password)
- Create Firestore Database

### 2. Add Sample Data

**Collection: `menu`**
```json
{
  "name": "Jollof Rice",
  "description": "Nigerian jollof rice",
  "price": 2500,
  "category": "Rice Dishes",
  "imageUrl": "https://via.placeholder.com/300",
  "featured": true
}
```

### 3. Set Security Rules
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /menu/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## App Features Overview

### ✅ Implemented Features
- **Authentication**: Login, Register, Guest mode
- **Menu**: Browse by category, search, view details
- **Cart**: Add/remove items, persistent storage
- **Checkout**: WhatsApp or Firebase order placement
- **Orders**: View history, filter by status
- **Gallery**: Image/video viewer with lightbox
- **Testimonials**: Customer reviews
- **Contact**: Phone, email, WhatsApp, messaging
- **Profile**: Edit user information

### 🎨 Design System
- **Primary Color**: #E10600 (Red)
- **Secondary Color**: #000000 (Black)
- **Accent Color**: #F2F2F2 (White)
- **Font**: Poppins
- **Theme**: Premium Nigerian restaurant

## Folder Structure

```
b2d-mobile-app/
├── src/
│   ├── config/          # Firebase configuration
│   ├── constants/       # Theme, colors, sizes
│   ├── contexts/        # Auth & Cart state management
│   ├── navigation/      # App navigation setup
│   └── screens/         # All app screens (15 screens)
├── assets/              # Images and icons
├── App.js               # Main app entry
├── package.json         # Dependencies
├── README.md            # Full documentation
└── SETUP.md             # Detailed setup guide
```

## Common Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on Web
npm run web

# Clear cache
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules && npm install
```

## Testing Without Firebase

The app will run without Firebase configuration, but with limited functionality:
- ✅ UI and navigation work
- ✅ Cart functionality works (local storage)
- ❌ Authentication won't work
- ❌ Menu data won't load (empty)
- ❌ Orders won't save to database

To test fully, you need to configure Firebase (5 minutes).

## Production Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## Troubleshooting

**Problem**: App won't start
```bash
npm install
npm start -- --reset-cache
```

**Problem**: Firebase errors
- Check `src/config/firebase.js` has correct credentials
- Verify Firebase Authentication is enabled
- Check Firestore database is created

**Problem**: Dependencies error
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Run the app with `npm start`
2. ⚙️ Configure Firebase credentials
3. 📝 Add menu items to Firestore
4. 📞 Update contact information
5. 🚀 Test on real device
6. 📦 Build for production

## Support

- 📖 See [README.md](./README.md) for full documentation
- 🛠️ See [SETUP.md](./SETUP.md) for detailed setup
- 📧 Contact: orders@b2dkitchen.ng

---

**Ready to go! Just run `npm start` and scan the QR code.** 🚀
