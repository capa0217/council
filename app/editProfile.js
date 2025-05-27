import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Text,
  TextInput,
  CheckBox,
  View,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
  const [profiles, setProfiles] = useState(null);

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
    if (!userId) return;

    (async () => {
      try {
        const res = await axios.get(`http://10.128.201.19:8081/profile/${userId}`);
        setProfiles(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        Alert.alert('Error', 'Failed to load profile');
      }
    })();
  }, [userId]);

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
        dob: profiles.dob ? new Date(profiles.dob).toLocaleDateString() : '',
        pronouns: profiles.pronouns || '',
        private: !!profiles.private,
        want_marketing: !!profiles.want_marketing,
      });
    }
  }, [profiles, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      userId,
    };
    try {
      const editProfileResponse = await axios.post(`http://10.128.201.19:8081/profile/edit`, payload);
      console.log('Server Response:', editProfileResponse.data);
      Alert.alert('Success', 'Update successful');
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        <Image
          source={{
            uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
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
        ].map(({ name, placeholder, lines, multiline, autocomplete }) => (
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
                numberOfLines={lines}
              />
            )}
          />
        ))}

        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            name="private"
            render={({ field: { onChange, value } }) => (
              <CheckBox
                value={value}
                onValueChange={onChange}
                style={styles.checkbox}
              />
            )}
          />
          <Text style={styles.label}>Private Member Account</Text>

          <Controller
            control={control}
            name="want_marketing"
            render={({ field: { onChange, value } }) => (
              <CheckBox
                value={value}
                onValueChange={onChange}
                style={styles.checkbox}
              />
            )}
          />
          <Text style={styles.label}>Opt Into Marketing</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text>Submit Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({ pathname: '/profile', query: { user_Id: userId } })}
        >
          <Text>Cancel Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start', // moved here
  },
  innerContainer: {
    width: '100%', // ensures inputs take full width inside ScrollView
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  button: {
    backgroundColor: 'orange',
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 10,
    marginRight: 30,
  },
});
