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
      const response = await axios.post('http://192.168.1.107:8081/users/login', {
        website_login: website_login.trim(),
        password: password.trim(),
      });

       // Store user data in AsyncStorage
      await AsyncStorage.setItem('userId', response.data.user_id.toString());
      // Navigate to the profile screen and pass user_id as parameter
      router.push({
        pathname: '/club_meeting',
        query: { userId: response.data.user_id},
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
    <View >
      <Image
        source={{
          uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <View style={styles.inputs}><Text>Login:</Text>
          <TextInput
            style={styles.LoginText}
            placeholder="Please enter your login"
            onChangeText={setLogin}
            value={website_login}
          />
          <Text>Password:</Text>
          <TextInput
            style={styles.PasswordText}
            placeholder="Please enter your password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          /></View>

        <View style={styles.function}
        ><TouchableOpacity style={styles.button} onPress={() => router.push('./register')}>
            <Text >Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text >Login</Text>
          </TouchableOpacity></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 60,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orange',
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 10,  // Adds top and bottom spacing
    marginRight: 30,
  },
  LoginText: {
    width: 300,            // fixed width
    height: 50,
  },
  PasswordText: {
    width: 300,            // fixed width
    height: 50,
  },
  inputs: {
    alignItems: 'center',
  },
  container: {
    marginTop: 220,
    width: 400,
    height: 300,
    justifyContent: 'center',
    marginLeft: 430,  
  },
  function: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 55,
    marginTop: 10
  }
});

export default PizzaTranslator;