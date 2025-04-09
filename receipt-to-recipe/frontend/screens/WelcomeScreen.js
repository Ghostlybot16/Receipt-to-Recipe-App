import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PantryPal</Text>
      <Text style={styles.subtitle}>Your Smart Kitchen Companion</Text>
      <View style={styles.buttonWrapper}>
        <Button
          title="Get Started"
          color="#F4A300"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  buttonWrapper: {
    width: '60%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
