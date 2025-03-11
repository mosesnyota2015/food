import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const AddMealScreen = ({ navigation }) => {
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [mealPrice, setMealPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddMeal = () => {
    // Validate inputs
    if (!mealName.trim() || !mealDescription.trim() || !mealPrice.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // In a real app, this would save the data to a database
    // Since this is a prototype, just show a success message
    Alert.alert(
      'Meal Added',
      `${mealName} has been added to the menu!`,
      [
        {
          text: 'View Menu',
          onPress: () => navigation.navigate('Menu'),
        },
        {
          text: 'Add Another',
          onPress: () => {
            // Clear form
            setMealName('');
            setMealDescription('');
            setMealPrice('');
            setImageUrl('');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Meal</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.formContainer}>
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

          <View style={styles.formGroup}>
            <Text style={styles.label}>Image URL (Optional)</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="Enter image URL"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.label}>Meal Category</Text>
            <View style={styles.categoriesRow}>
              {['Main Dish', 'Appetizer', 'Dessert', 'Drink'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.categoryChip}
                  onPress={() => Alert.alert('Category Selected', `${category} category selected!`)}
                >
                  <Text style={styles.categoryChipText}>{category}</Text>
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

          <View style={styles.infoContainer}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              This is a prototype. New meals will not be permanently saved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 30,
    color: '#4A2511',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
  categoriesRow: {
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
  categoryChipText: {
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
  },
});

export default AddMealScreen; 