import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Alert, TextInput, AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import placeholderImage from './assets/image.png';

// Nigerian meals data
const NIGERIAN_MEALS = [
  {
    id: '1',
    name: 'Jollof Rice',
    description: 'Spicy rice dish cooked with tomatoes, peppers, and spices',
    price: '₦1,200',
    image: 'https://i.imgur.com/zYMnC3y.jpg',
  },
  {
    id: '2',
    name: 'Egusi Soup',
    description: 'Melon seed soup with vegetables and assorted meat',
    price: '₦1,500',
    image: 'https://i.imgur.com/GXzxhvO.jpg',
  },
  {
    id: '3',
    name: 'Pounded Yam & Egusi',
    description: 'Smooth yam dough served with egusi soup',
    price: '₦1,800',
    image: 'https://i.imgur.com/MZQV9ky.jpg',
  },
  {
    id: '4',
    name: 'Suya',
    description: 'Spicy grilled meat skewers with a peanut-based rub',
    price: '₦1,000',
    image: 'https://i.imgur.com/q1oMdSk.jpg',
  },
  {
    id: '5',
    name: 'Moin Moin',
    description: 'Steamed bean pudding with peppers and spices',
    price: '₦800',
    image: 'https://i.imgur.com/CmR1f37.jpg',
  }
];

// After imports, add this component
const EmptyImagePlaceholder = ({ style }) => (
  <View style={[style, { backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }]}>
    <Text>🍽️</Text>
  </View>
);

// Define the app component
function QuickServeApp() {
  const [screen, setScreen] = useState('splash');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // Form state for add meal screen
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [mealPrice, setMealPrice] = useState('');

  // Add to cart function
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

  // Toggle favorite function
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      Alert.alert('Removed from Favorites', 'Item removed from your favorites.');
    } else {
      setFavorites([...favorites, id]);
      Alert.alert('Added to Favorites', 'Item added to your favorites!');
    }
  };

  // Handle add meal submission
  const handleAddMeal = () => {
    if (!mealName.trim() || !mealDescription.trim() || !mealPrice.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Meal Added',
      `${mealName} has been added to the menu!`,
      [
        { text: 'View Menu', onPress: () => setScreen('menu') },
        { 
          text: 'Add Another', 
          onPress: () => {
            setMealName('');
            setMealDescription('');
            setMealPrice('');
          }
        },
      ]
    );
  };

  // Render splash screen
  if (screen === 'splash') {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="light" />
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/TBiM9i5.png' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.appName}>QuickServe</Text>
          <Text style={styles.tagline}>Authentic Nigerian Cuisine</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setScreen('menu')}
        >
          <Text style={styles.buttonText}>Explore Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render menu screen
  if (screen === 'menu') {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nigerian Cuisine</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => Alert.alert('Cart', `You have ${cartItems.length} item(s) in your cart.`)}
            >
              <Text style={styles.iconText}>🛒</Text>
              {cartItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setScreen('addMeal')}
            >
              <Text style={styles.iconText}>➕</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={NIGERIAN_MEALS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isFavorite = favorites.includes(item.id);
            
            return (
              <View style={styles.mealItem}>
                <Image source={placeholderImage} style={styles.mealImage} />
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{item.name}</Text>
                  <Text style={styles.mealDescription}>{item.description}</Text>
                  <Text style={styles.mealPrice}>{item.price}</Text>
                  
                  <View style={styles.mealActions}>
                    <TouchableOpacity 
                      style={styles.actionButton} 
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.actionText}>🛒</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.actionButton} 
                      onPress={() => toggleFavorite(item.id)}
                    >
                      <Text style={styles.actionText}>{isFavorite ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => setScreen('menu')}
          >
            <Text style={styles.navIcon}>🍔</Text>
            <Text style={styles.navText}>Menu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => setScreen('addMeal')}
          >
            <Text style={styles.navIcon}>➕</Text>
            <Text style={styles.navText}>Add</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => Alert.alert('Cart', `You have ${cartItems.length} item(s) in your cart.`)}
          >
            <Text style={styles.navIcon}>🛒</Text>
            <Text style={styles.navText}>Cart</Text>
            {cartItems.length > 0 && (
              <View style={styles.navBadge}>
                <Text style={styles.navBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Render add meal screen
  if (screen === 'addMeal') {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setScreen('menu')}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Meal</Text>
          <View style={{ width: 30 }} />
        </View>
        
        <ScrollView style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Meal Name*</Text>
            <TextInput
              style={styles.input}
              value={mealName}
              onChangeText={setMealName}
              placeholder="Enter meal name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={mealDescription}
              onChangeText={setMealDescription}
              placeholder="Enter meal description"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Price (₦)*</Text>
            <TextInput
              style={styles.input}
              value={mealPrice}
              onChangeText={setMealPrice}
              placeholder="Enter price in Naira"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.label}>Meal Category</Text>
            <View style={styles.categories}>
              {['Main Dish', 'Appetizer', 'Dessert', 'Drink'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryChip}
                  onPress={() => Alert.alert('Category Selected', `${category} category selected!`)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddMeal}
          >
            <Text style={styles.addButtonText}>Add to Menu</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ℹ️ This is a prototype. New meals will not be permanently saved.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#4A2511',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#E8C07D',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E8C07D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#4A2511',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Menu Screen Styles
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#E8C07D',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A2511',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    position: 'relative',
  },
  iconText: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  mealItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: 120,
    height: 120,
  },
  mealDetails: {
    flex: 1,
    padding: 12,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A2511',
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  mealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A2511',
    marginBottom: 8,
  },
  mealActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 12,
    backgroundColor: '#E8C07D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 18,
  },
  
  // Add Meal Screen Styles
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 30,
    color: '#4A2511',
  },
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A2511',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    backgroundColor: '#E8C07D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: '#4A2511',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4A2511',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E8C07D',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#4A2511',
  },
  navBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

// Register the app
AppRegistry.registerComponent('main', () => QuickServeApp);

// For Expo compatibility, also export the component
export default QuickServeApp;