import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const NIGERIAN_MEALS = [
  {
    id: '1',
    name: 'Jollof Rice',
    description: 'Spicy rice dish cooked with tomatoes, peppers, and spices',
    price: '₦1,200',
    image: './assets/image.png',
  },
  {
    id: '2',
    name: 'Egusi Soup',
    description: 'Melon seed soup with vegetables and assorted meat',
    price: '₦1,500',
    image: './assets/image.png',
  },
  {
    id: '3',
    name: 'Pounded Yam & Egusi',
    description: 'Smooth yam dough served with egusi soup',
    price: '₦1,800',
    image: './assets/image.png',
  },
  {
    id: '4',
    name: 'Suya',
    description: 'Spicy grilled meat skewers with a peanut-based rub',
    price: '₦1,000',
    image: './assets/image.png',
  },
  {
    id: '5',
    name: 'Moin Moin',
    description: 'Steamed bean pudding with peppers and spices',
    price: '₦800',
    image: './assets/image.png',
  },
  {
    id: '6',
    name: 'Pepper Soup',
    description: 'Spicy broth with assorted meat or fish',
    price: '₦1,300',
    image: './assets/image.png',
  },
  {
    id: '7',
    name: 'Akara',
    description: 'Deep-fried bean cakes made from black-eyed peas',
    price: '₦500',
    image: './assets/image.png',
  },
];

const MenuScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
      Alert.alert('Removed from Favorites', 'Item removed from your favorites.');
    } else {
      setFavorites([...favorites, id]);
      Alert.alert('Added to Favorites', 'Item added to your favorites!');
    }
  };

  const renderMealItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.mealItem}>
        <Image source={{ uri: item.image }} style={styles.mealImage} />
        <View style={styles.mealDetails}>
          <Text style={styles.mealName}>{item.name}</Text>
          <Text style={styles.mealDescription}>{item.description}</Text>
          <Text style={styles.mealPrice}>{item.price}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>🛒</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => toggleFavorite(item.id)}
            >
              <Text style={styles.buttonText}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nigerian Cuisine</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => Alert.alert('Cart', `You have ${cartItems.length} item(s) in your cart.`)}
          >
            <Text style={styles.iconText}>🛒</Text>
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.addMealButton}
            onPress={() => navigation.navigate('AddMeal')}
          >
            <Text style={styles.iconText}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={NIGERIAN_MEALS}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.mealsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    marginRight: 12,
    position: 'relative',
  },
  cartBadge: {
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
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addMealButton: {},
  mealsList: {
    padding: 16,
  },
  mealItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  actionButtons: {
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
  buttonText: {
    fontSize: 20,
  },
  iconText: {
    fontSize: 24,
  },
});

export default MenuScreen; 