import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#F4A300" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.loginBox}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          Already have an account?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9E5' },
  backButton: { paddingHorizontal: 20, paddingTop: 10 },
  loginBox: {
    backgroundColor: '#fff',
    margin: 25,
    padding: 30,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#F4A300',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signup: {
    textAlign: 'center',
    fontSize: 13,
    color: '#444',
  },
  signupLink: {
    color: '#F4A300',
    fontWeight: '600',
  },
});
