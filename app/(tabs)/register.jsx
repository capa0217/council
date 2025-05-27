import React from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const PORT = 8081;

// Function to generate a random numeric user ID
function generateShortId(length) {
  let id = '';
  for (let i = 0; i <= length; i++) {
    id += Math.floor(Math.random() * 10); // 0–9
  }
  return Number(id);
}

export default function MembershipForm() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
  });

  const onSubmit = async (data) => {
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    let website_login = "";
    let password = "";

    try {
      const memberResponse = await axios.post('http://localhost:8081/users/checkMonthlyMembers');
      console.log('Server Response:', memberResponse.data.message);
      Alert.alert('Success', 'Membership successful');
      website_login = yyyy + mm + memberResponse.data.monthlyMembers;
      password = data.first_name.charAt(0).toUpperCase() + data.last_name.charAt(0).toUpperCase() + yyyy + mm + memberResponse.data.monthlyMembers;
    } catch (error) {
      console.error('Error checking members:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Member Check Failed');
    }

    let uniqueID = false;
    let user_id = 0;
    while (uniqueID == false){
      user_id = generateShortId(6); // generate new ID each time

      try {
      const checkIDResponse = await axios.post('http://localhost:8081/users/checkIDExists', {user_id});
      console.log('Server Response:', checkIDResponse.data.message);

      if(checkIDResponse.data.exists == false){
        uniqueID = true;
      }
      } catch (error) {
        console.error('Error checking members:', error.response ? error.response.data : error.message);
        Alert.alert('Error', error.response?.data?.message || 'Member Check Failed');
      }
    }

    //Use the generated registration information to insert into the database
    const payload = {
      ...data,
      user_id,
      website_login,
      password,
    };

    try {
      const createMemberResponse = await axios.post(`http://localhost:8081/users/newMember`, payload);
      console.log('Server Response:', createMemberResponse.data);
      Alert.alert('Success', 'Membership successful');
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Membership failed');
    }

    try {
      const registerResponse = await axios.post(`http://localhost:8081/users/register`, payload);
      console.log('Server Response:', registerResponse.data);
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
        { name: 'first_name', placeholder: 'First Name', autocomplete: 'given-name' },
        { name: 'last_name', placeholder: 'Last Name', autocomplete: 'family-name' },
        { name: 'email', placeholder: 'Email Address', autocomplete: 'email' },
      ].map(({ name, placeholder, lines, autocomplete }) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              autoComplete={autocomplete}
              placeholder={placeholder}
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
