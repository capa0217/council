import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

// Function to generate a random 6-digit numeric user ID
function generateShortId(length = 6) {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += Math.floor(Math.random() * 10); 
  }
  return Number(id);
}

export default function RegisterForm() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const userId = generateShortId(6); // generate new ID each time
    const payload = {
      ...data,
      userId,
    };

    try {
      const response = await axios.post('http://192.168.1.107:8081/users/register', payload);
      console.log('Server response:', response.data);
      Alert.alert('Success', 'Registration successful');
      reset(); // clear the form after successful registration
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      {[ 
        { name: 'email', placeholder: 'Email', secure: false },
        { name: 'password', placeholder: 'Password', secure: true },
      ].map(({ name, placeholder, secure }) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={secure}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
      ))}
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});
