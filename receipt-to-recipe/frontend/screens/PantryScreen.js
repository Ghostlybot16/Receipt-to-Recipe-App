import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PantryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantry Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#1C1C1E',
    fontWeight: '600',
  },
});
