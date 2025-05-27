import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Text, TextInput, CheckBox, View, Alert, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';

export default function EditProfile() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      postcode: '',
      interests: '',
      dob: '',
      pronouns: '',
      private: false,
      want_marketing: false,
    },
  });

  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [profiles, setProfiles] = useState([]);

  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error fetching userId from storage:', error);
        Alert.alert('Error', 'Failed to load user ID');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://10.128.201.19:8081/profile/${userId}`);
        setProfiles(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching userId from storage:', error);
        Alert.alert('Error', 'Failed to load user ID');
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (profiles) {
      setPrivacy(profiles.private ? true : false);
      setMarketing(profiles.want_marketing ? true : false);
    }
  }, [profiles]);

  useEffect(() => {
    if (profiles) {
      reset({
        first_name: profiles.first_name || '',
        last_name: profiles.last_name || '',
        email: profiles.email || '',
        phone_number: profiles.phone_number || '',
        address: profiles.address || '',
        postcode: profiles.postcode || '',
        interests: profiles.interests || '',
        dob: new Date(profiles.dob).toLocaleDateString() || '',
        pronouns: profiles.pronouns || '',
        private: !!profiles.private,
        want_marketing: !!profiles.want_marketing,
      });
    }
  }, [profiles]);

  const onSubmit = async (data) => {
    //Use the generated registration information to insert into the database
    console.log("Hello!");
    const payload = {
      ...data,
      userId,
    };
    console.log(payload);
    try {
      const editProfileResponse = await axios.post(`http://localhost:8081/profile/edit`, payload);
      console.log('Server Response:', editProfileResponse.data);
      Alert.alert('Success', 'Update successful');
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Update failed');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.container}>
        {[
          { name: 'first_name', placeholder: 'First Name', autocomplete: 'given-name', lines: 1, multiline: false },
          { name: 'last_name', placeholder: 'Last Name', autocomplete: 'family-name', lines: 1, multiline: false },
          { name: 'email', placeholder: 'Email Address', autocomplete: 'email', lines: 1, multiline: false },
          { name: 'phone_number', placeholder: 'Phone Number', autocomplete: 'tel', lines: 1, multiline: false },
          { name: 'address', placeholder: 'Address', autocomplete: 'address-line1', lines: 2, multiline: true },
          { name: 'postcode', placeholder: 'Postcode', autocomplete: 'postal-code', lines: 1, multiline: false },
          { name: 'interests', placeholder: 'Interests', autocomplete: 'off', lines: 4, multiline: true },
          { name: 'dob', placeholder: 'Date of Birth', autocomplete: 'off', lines: 1, multiline: false },
          { name: 'pronouns', placeholder: 'Pronouns', autocomplete: 'off', lines: 1, multiline: false },
        ].map(({ name, placeholder, lines, multiline, autocomplete, defaultValue }) => (
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
                multiline={multiline}
                lines={lines}
                defaultValue={defaultValue}
              />
            )}
          />
        ))}

        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            name="private"
            render={({ field: { setPrivacy, value } }) => (
              <CheckBox
                value={value}
                onValueChange={setPrivacy}
                style={styles.checkbox}
              />
            )}
          />
          <Text style={styles.label}>Private Member Acount</Text>
          <Controller
            control={control}
            name="want_marketing"
            render={({ field: { setMarketing, value } }) => (
              <CheckBox
                key='want_marketing'
                value={value}
                onValueChange={setMarketing}
                style={styles.checkbox}
              />

            )}
          />
          <Text style={styles.label}>Opt Into Marketing</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text>Submit Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push({
          pathname: '/profile',
          query: { user_Id: userId },
        })}>
          <Text>Cancel Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  information: {
    padding: 10,
    backgroundColor: '#f9f9f9', // optional
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
  },
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
})