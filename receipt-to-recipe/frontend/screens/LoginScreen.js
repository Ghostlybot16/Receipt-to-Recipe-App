import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#F4A300" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Text style={styles.showPassword}>
            {secureText ? 'Show Password' : 'Hide Password'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          Don’t have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
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
  showPassword: {
    textAlign: 'right',
    color: '#F4A300',
    marginBottom: 20,
    fontWeight: '500',
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
  forgot: {
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  googleText: {
    color: '#1C1C1E',
    fontWeight: '600',
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
