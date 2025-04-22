import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import axios from 'axios';

const PizzaTranslator = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.107:3000/users', {
        Email,
        Password,
      });
      Alert.alert('Login Response', response.data.message);
    } catch (error) {
      // Enhanced error handling for more detailed feedback
      if (error.response) {
        // If the error is from the server (e.g., 401 or 500 error)
        console.error(error.response.data);
        Alert.alert('Error', error.response.data.message || 'An error occurred');
      } else {
        // If it's a network issue or no response
        console.error(error);
        Alert.alert('Error', 'Failed to connect to server');
      }
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>Email:</Text>
      <TextInput
        style={{ height: 40, borderWidth: 1, marginBottom: 10 }}
        placeholder="Please enter your email"
        onChangeText={setEmail}
        value={Email}
      />
      <Text>Password:</Text>
      <TextInput
        style={{ height: 40, borderWidth: 1 }}
        placeholder="Please enter your password"
        secureTextEntry
        onChangeText={setPassword}
        value={Password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default PizzaTranslator;
