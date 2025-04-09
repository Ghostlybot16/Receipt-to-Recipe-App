import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ReceiptCaptureScreen() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Camera permission is required to take a receipt photo.');
      }
    })();
  }, []);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const retake = () => setImage(null);

  const confirm = () => {
    Alert.alert('Photo confirmed', 'Ready to send to backend!');
    // TODO: Dev B will upload image.uri or image.base64
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <View style={styles.centered}>
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <Ionicons name="camera" size={36} color="#fff" />
            <Text style={styles.captureText}>Take Receipt Photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image.uri }} style={styles.preview} />
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={retake}>
              <Text style={styles.actionText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={confirm}>
              <Text style={styles.actionText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#F4A300',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
  },
  captureText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionBtn: {
    backgroundColor: '#F4A300',
    padding: 14,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
});
