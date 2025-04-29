import React, { useState } from 'react';
import { Text, TextInput, View, Button, Alert} from 'react-native';
import axios from 'axios';

const PizzaTranslator = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.128.201.19:8081/users/login', {
        Email: Email.trim(),
        Password: Password.trim(),
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
      <a style={{ textAlign: 'center'}} href="http://localhost:8081/register">You do not have an account?</a>
    </View>
  );
};

export default PizzaTranslator;