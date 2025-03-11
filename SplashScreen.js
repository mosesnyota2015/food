import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.buttonText}>Explore Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#E8C07D',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4A2511',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SplashScreen; 