import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import PantryScreen from '../screens/PantryScreen';
import RecipesScreen from '../screens/RecipesScreen';
import ReceiptCaptureScreen from '../screens/ReceiptCaptureScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -2 },
          elevation: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Pantry"
        component={PantryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={22} color={color || '#333'} />
          ),
        }}
      />

      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={22}
              color={color || '#333'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Receipt"
        component={ReceiptCaptureScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.floatingCameraButton}>
              <Ionicons name="camera" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmark" size={22} color={color || '#333'} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={22} color={color || '#333'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  floatingCameraButton: {
    backgroundColor: '#F4A300',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
});
