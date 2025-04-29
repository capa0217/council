import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

export default function RegisterForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      userId: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://10.128.201.19:8081/users/register', data);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      {[
        { name: 'userId', placeholder: 'User ID', secure: false },
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
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
