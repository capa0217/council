import React, { useState } from 'react';
import { Text, Image, TextInput, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PizzaTranslator = () => {
  const router = useRouter();

  const [website_login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/users/login', {
        website_login: website_login.trim(),
        password: password.trim(),
      });

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('userId', response.data.user_id.toString());
      // Navigate to the profile screen and pass user_id as parameter
      router.push({
        pathname: '/club_meeting',
        query: { userId: response.data.user_id },
      });
      console.log('Server response:', response.data);
      Alert.alert('Login Response', response.data.message);
    } catch (error) {
      if (error.response) {
        console.error('Server error response:', error.response.data);
        Alert.alert('Error', error.response.data.message || 'An error occurred');
      } else {
        console.error('Network or other error:', error);
        Alert.alert('Error', 'Failed to connect to server');
      }
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.inputs}>
          <Text style={styles.label}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter your login"
            onChangeText={setLogin}
            value={website_login}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter your password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          /></View>

        <View style={styles.function}
        ><TouchableOpacity style={styles.button} onPress={() => router.push('./register')}>
            <Text style={styles.whiteText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.whiteText}>Login</Text>
          </TouchableOpacity></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#AFABA3',
    height: '100%',
  },
  logo: {
    width: 150,
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#065395',
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 10,  // Adds top and bottom spacing
    marginHorizontal: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: '#433D33',
    width: '100%',
    height: 50,
    marginTop: '1%',
    marginBottom: '5%',
  },
  inputs: {
    marginHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    backgroundColor: '#F1F6F5',
    borderWidth: 2,
    borderColor: '#433D33',
    marginTop: '45%',
    paddingVertical: '5%',
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: '#F1F6F5',
  },
  function: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  whiteText: {
    color: '#F1F6F5',
  },
});

export default PizzaTranslator;