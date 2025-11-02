# B2D Kitchen Mobile App

A complete, fully functional mobile application for **B2D Kitchen (Breakfast 2 Dinner)** built with **React Native (Expo)**. This mobile app connects directly to the existing Firebase + Cloudinary backend.

## Features

### 🎯 Core Features
- **Splash Screen & Onboarding** - Beautiful introduction to the app
- **Authentication** - Email/Password login and registration with Firebase Auth
- **Home Dashboard** - Featured dishes, categories, and quick actions
- **Dynamic Menu** - Browse dishes by category with search functionality
- **Item Details** - View detailed information with quantity and spice level selection
- **Shopping Cart** - Add, update, and remove items with persistent storage
- **Checkout** - Place orders via WhatsApp or Firebase with delivery details
- **Orders History** - View past orders with status filtering
- **Gallery** - Browse images and videos with lightbox view
- **Testimonials** - Read customer reviews and ratings
- **Contact & Support** - Phone, email, WhatsApp, and in-app messaging
- **Profile Management** - Edit user information and app settings

### 🎨 Design
- **Brand Colors**: Red (#E10600), Black (#000000), White (#F2F2F2)
- **Typography**: Poppins font family
- **Theme**: Premium, modern, Nigerian restaurant style
- **Responsive**: Optimized for all screen sizes

### 🔥 Firebase Integration
- **Authentication**: User login, registration, and session management
- **Firestore Collections**:
  - `menu` - Restaurant menu items
  - `orders` - Customer orders
  - `media` - Gallery images/videos
  - `testimonials` - Customer reviews
  - `users` - User profiles
  - `messages` - Customer support messages
- **Real-time Updates**: Live data synchronization

### 📦 Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State Management**: Context API
- **Backend**: Firebase (Auth + Firestore)
- **Media**: Cloudinary for image/video storage
- **UI Components**: Custom components with Expo Vector Icons
- **Local Storage**: AsyncStorage for cart persistence

## Project Structure

```
b2d-mobile-app/
├── App.js                          # Main app entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── src/
│   ├── config/
│   │   └── firebase.js            # Firebase configuration
│   ├── constants/
│   │   └── theme.js               # Design system (colors, fonts, spacing)
│   ├── contexts/
│   │   ├── AuthContext.js         # Authentication state management
│   │   └── CartContext.js         # Shopping cart state management
│   ├── navigation/
│   │   └── AppNavigator.js        # Navigation structure
│   ├── screens/
│   │   ├── SplashScreen.js        # Splash screen with animation
│   │   ├── OnboardingScreen.js    # Onboarding carousel
│   │   ├── LoginScreen.js         # User login
│   │   ├── RegisterScreen.js      # User registration
│   │   ├── HomeScreen.js          # Main dashboard
│   │   ├── MenuScreen.js          # Menu listing with categories
│   │   ├── MenuDetailScreen.js    # Item details and customization
│   │   ├── CartScreen.js          # Shopping cart
│   │   ├── CheckoutScreen.js      # Order checkout
│   │   ├── GalleryScreen.js       # Photo/video gallery
│   │   ├── TestimonialsScreen.js  # Customer reviews
│   │   ├── OrdersScreen.js        # Order history
│   │   ├── ContactScreen.js       # Contact information
│   │   ├── ProfileScreen.js       # User profile
│   │   └── EditProfileScreen.js   # Edit profile details
│   ├── components/                # Reusable UI components
│   ├── services/                  # API and service functions
│   └── utils/                     # Helper functions
└── assets/                        # Images, fonts, and media files
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator
- Expo Go app on your mobile device (optional)

### Setup Instructions

1. **Navigate to the mobile app directory**:
   ```bash
   cd b2d-mobile-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Open `src/config/firebase.js`
   - Replace the placeholder values with your Firebase project credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

4. **Update Contact Information**:
   - Open `src/screens/ContactScreen.js`
   - Update the `CONTACT_INFO` object with your actual contact details
   - Open `src/screens/CheckoutScreen.js`
   - Update the WhatsApp number in `handleWhatsAppOrder` function

5. **Run the app**:
   ```bash
   # Start Expo development server
   npm start

   # Or run directly on platform
   npm run android    # For Android
   npm run ios        # For iOS (Mac only)
   npm run web        # For web browser
   ```

6. **Scan QR Code**:
   - Install Expo Go on your mobile device
   - Scan the QR code shown in terminal/browser
   - App will load on your device

## Firebase Setup

### Required Firestore Collections

1. **menu** - Menu items
   ```javascript
   {
     name: "Jollof Rice",
     description: "Nigerian style jollof rice",
     price: 2500,
     category: "Rice Dishes",
     imageUrl: "cloudinary_url",
     featured: true,
     ingredients: "Rice, tomatoes, pepper...",
     allergens: "None",
     createdAt: "2024-01-01T00:00:00.000Z"
   }
   ```

2. **orders** - Customer orders
   ```javascript
   {
     userId: "user_id",
     userName: "John Doe",
     userEmail: "john@example.com",
     userPhone: "+234...",
     items: [...],
     total: 5000,
     deliveryAddress: "123 Street...",
     status: "Pending",
     createdAt: "2024-01-01T00:00:00.000Z"
   }
   ```

3. **media** - Gallery items
   ```javascript
   {
     url: "cloudinary_url",
     type: "image", // or "video"
     createdAt: "2024-01-01T00:00:00.000Z"
   }
   ```

4. **testimonials** - Customer reviews
   ```javascript
   {
     name: "Jane Smith",
     rating: 5,
     comment: "Amazing food!",
     createdAt: "2024-01-01T00:00:00.000Z"
   }
   ```

5. **users** - User profiles
   ```javascript
   {
     uid: "user_id",
     email: "user@example.com",
     name: "John Doe",
     phone: "+234...",
     createdAt: "2024-01-01T00:00:00.000Z"
   }
   ```

6. **messages** - Contact messages
   ```javascript
   {
     userId: "user_id",
     userName: "John Doe",
     userEmail: "user@example.com",
     message: "Message text",
     status: "unread",
     createdAt: "2024-01-01T00:00:00.000Z"
   }
   ```

## Key Features Implementation

### Authentication Flow
- Users can login, register, or browse as guest
- Guest users can view menu but must login to place orders
- Firebase Authentication handles all user management
- User data synced to Firestore `users` collection

### Cart & Checkout
- Cart persists using AsyncStorage
- Two checkout options:
  1. **WhatsApp Order**: Opens WhatsApp with pre-filled order message
  2. **Firebase Order**: Saves order to Firestore with "Pending" status
- Cart cleared after successful order placement

### Menu & Search
- Dynamic categories loaded from Firestore
- Real-time search filtering
- Pull-to-refresh for fresh data
- Item customization (quantity, spice level)

### Orders Management
- View order history filtered by status
- Real-time order status updates
- Order details view

### Offline Support
- Menu data cached for offline viewing
- Cart persists locally
- Graceful error handling for no internet

## Deployment

### Building for Production

**Android APK**:
```bash
expo build:android
```

**iOS IPA**:
```bash
expo build:ios
```

**Using EAS Build** (Recommended):
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## Environment Variables

Create a `.env` file for sensitive configuration:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**:
   ```bash
   npm start -- --reset-cache
   ```

2. **Dependencies issues**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS build issues**:
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Firebase not connecting**:
   - Verify Firebase config in `src/config/firebase.js`
   - Check Firebase console for API key restrictions
   - Ensure Firebase Authentication is enabled

## Performance Optimization

- Images optimized using Cloudinary transformations (`f_auto,q_auto`)
- Lazy loading for large lists
- Pagination for Firestore queries
- AsyncStorage for cart persistence
- Pull-to-refresh for data updates
- Minimal re-renders with Context API

## Security

- Firebase security rules should be configured
- User authentication required for orders
- Input validation on all forms
- Secure storage of user data
- HTTPS for all network requests

## Support

For issues or questions:
- Email: orders@b2dkitchen.ng
- Phone: +234 000 000 0000
- WhatsApp: Available in-app

## License

© 2024 B2D Kitchen. All rights reserved.

---

Built with ❤️ using React Native & Expo
