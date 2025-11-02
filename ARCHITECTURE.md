# B2D Kitchen Mobile App - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     B2D Kitchen Mobile App                   │
│                    (React Native + Expo)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Firebase   │    │  Cloudinary  │    │   WhatsApp   │
│              │    │              │    │              │
│ - Auth       │    │ - Images     │    │ - Orders     │
│ - Firestore  │    │ - Videos     │    │ - Support    │
└──────────────┘    └──────────────┘    └──────────────┘
```

## App Navigation Structure

```
App.js (Root)
│
├── AuthProvider (Context)
│   └── CartProvider (Context)
│       └── NavigationContainer
│           │
│           ├── Auth Flow (Not Logged In)
│           │   ├── SplashScreen
│           │   ├── OnboardingScreen
│           │   ├── LoginScreen
│           │   └── RegisterScreen
│           │
│           └── Main Flow (Logged In)
│               ├── Bottom Tabs Navigator
│               │   ├── Home Tab
│               │   │   └── HomeScreen
│               │   ├── Menu Tab
│               │   │   └── MenuScreen
│               │   ├── Orders Tab
│               │   │   └── OrdersScreen
│               │   └── Profile Tab
│               │       └── ProfileScreen
│               │
│               └── Stack Navigator (Modal Screens)
│                   ├── MenuDetailScreen
│                   ├── CartScreen
│                   ├── CheckoutScreen
│                   ├── GalleryScreen
│                   ├── TestimonialsScreen
│                   ├── ContactScreen
│                   └── EditProfileScreen
```

## Data Flow

### Authentication Flow
```
User Action → AuthContext → Firebase Auth → Firestore (users)
    │                                            │
    └────────────── Success ←──────────────────┘
                     │
                     ▼
            Update App State
                     │
                     ▼
            Navigate to Home
```

### Shopping Cart Flow
```
Browse Menu → Select Item → Add to Cart
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            CartContext              AsyncStorage
                    │                       │
                    └───────────┬───────────┘
                                │
                                ▼
                          Cart Screen
                                │
                                ▼
                         Checkout Screen
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
              WhatsApp Order          Firebase Order
                    │                       │
                    └───────────┬───────────┘
                                │
                                ▼
                          Clear Cart
                                │
                                ▼
                          Success Message
```

### Menu Data Flow
```
App Launch → Firestore Query → menu Collection
                                      │
                                      ▼
                              Load Menu Items
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
            Category Filter    Search Filter    Featured Filter
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      │
                                      ▼
                              Display in UI
                                      │
                                      ▼
                          Cache Locally (Optional)
```

## State Management

### Context Providers

1. **AuthContext**
   - Current user
   - User data from Firestore
   - Login/Logout functions
   - Registration function
   - Password reset

2. **CartContext**
   - Cart items array
   - Add to cart
   - Remove from cart
   - Update quantity
   - Clear cart
   - Get total price
   - Get item count

### Local Storage (AsyncStorage)

- **Cart Persistence**: Saves cart items locally
- **User Preferences**: Theme, language (future)

## Component Structure

### Screen Components (15 screens)

```
screens/
├── Auth Flow
│   ├── SplashScreen.js          (Animated logo)
│   ├── OnboardingScreen.js      (3-page carousel)
│   ├── LoginScreen.js           (Email + Password)
│   └── RegisterScreen.js        (Full registration form)
│
├── Main Tabs
│   ├── HomeScreen.js            (Dashboard with featured items)
│   ├── MenuScreen.js            (Categorized menu listing)
│   ├── OrdersScreen.js          (Order history with filters)
│   └── ProfileScreen.js         (User profile and settings)
│
└── Modal Screens
    ├── MenuDetailScreen.js      (Item details + customization)
    ├── CartScreen.js            (Shopping cart management)
    ├── CheckoutScreen.js        (Order placement)
    ├── GalleryScreen.js         (Photo/video viewer)
    ├── TestimonialsScreen.js    (Customer reviews)
    ├── ContactScreen.js         (Contact information)
    └── EditProfileScreen.js     (Edit user profile)
```

## Firebase Firestore Schema

### Collections

```
firestore/
│
├── menu/
│   └── {menuItemId}
│       ├── name: string
│       ├── description: string
│       ├── price: number
│       ├── category: string
│       ├── imageUrl: string
│       ├── featured: boolean
│       ├── ingredients: string
│       ├── allergens: string
│       └── createdAt: timestamp
│
├── orders/
│   └── {orderId}
│       ├── userId: string
│       ├── userName: string
│       ├── userEmail: string
│       ├── userPhone: string
│       ├── items: array
│       ├── total: number
│       ├── deliveryAddress: string
│       ├── status: string
│       └── createdAt: timestamp
│
├── users/
│   └── {userId}
│       ├── uid: string
│       ├── email: string
│       ├── name: string
│       ├── phone: string
│       └── createdAt: timestamp
│
├── media/
│   └── {mediaId}
│       ├── url: string
│       ├── type: string (image/video)
│       └── createdAt: timestamp
│
├── testimonials/
│   └── {testimonialId}
│       ├── name: string
│       ├── rating: number
│       ├── comment: string
│       └── createdAt: timestamp
│
└── messages/
    └── {messageId}
        ├── userId: string
        ├── userName: string
        ├── userEmail: string
        ├── message: string
        ├── status: string
        └── createdAt: timestamp
```

## Key Technologies

### Frontend
- **React Native**: Cross-platform mobile framework
- **Expo**: Build and deployment toolchain
- **React Navigation**: Navigation library
- **Context API**: State management

### Backend
- **Firebase Authentication**: User management
- **Cloud Firestore**: NoSQL database
- **Cloudinary**: Media storage and optimization

### UI/UX
- **Expo Vector Icons**: Icon library
- **React Native Paper**: UI components (optional)
- **Animated API**: Animations
- **AsyncStorage**: Local data persistence

## Security Architecture

```
Mobile App
    │
    ├── Firebase Auth Token (JWT)
    │   └── Sent with all Firestore requests
    │
    ├── Firestore Security Rules
    │   ├── Read: Public for menu, media, testimonials
    │   ├── Write: Authenticated users only
    │   └── User Data: Owner access only
    │
    └── HTTPS/TLS
        └── All network requests encrypted
```

## Performance Optimizations

1. **Lazy Loading**: FlatList with windowing
2. **Image Optimization**: Cloudinary auto-format and quality
3. **Caching**: AsyncStorage for frequently accessed data
4. **Pagination**: Firestore queries with limits
5. **Memoization**: React.memo for components
6. **Code Splitting**: Navigation-based lazy loading

## Offline Support

```
Online → Fetch from Firebase → Cache Locally
                                      │
                                      ▼
Offline → Load from Cache → Display Cached Data
                                      │
                                      ▼
                            Queue Actions (e.g., orders)
                                      │
                                      ▼
Back Online → Sync Queued Actions → Firebase
```

## Development Workflow

```
1. Code Changes → Local Dev Server (Expo)
                        │
                        ▼
2. Test on Device → Expo Go App
                        │
                        ▼
3. Fix Issues → Commit to Git
                        │
                        ▼
4. Build → EAS Build Service
                        │
                        ▼
5. Deploy → App Stores (iOS/Android)
```

## Scalability Considerations

- **Firestore Indexing**: Create composite indexes for common queries
- **Cloud Functions**: Move complex logic to serverless functions
- **CDN**: Cloudinary handles media delivery at scale
- **Caching Strategy**: Implement Redis for frequently accessed data
- **Rate Limiting**: Implement in Firebase Security Rules
- **Analytics**: Add Firebase Analytics for usage tracking

---

**This architecture supports thousands of concurrent users with proper Firebase scaling.**
