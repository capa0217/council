import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Text, View, Alert, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PORT = 8081;

export default function Profile() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [profiles, setProfiles] = useState([]);
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
        const res = await axios.get(`http://${process.env.IP}:${PORT}/profile/${userId}`);
        setProfiles(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching userId from storage:', error);
        Alert.alert('Error', 'Failed to load user ID');
      }
    })();
  }, [userId]);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.information}>
        <Text style={styles.infoText}>Member_id: {profiles.user_id}</Text>
        <Text style={styles.infoText}>First Name: {profiles.first_name}</Text>
        <Text style={styles.infoText}>Last Name: {profiles.last_name}</Text>
        <Text style={styles.infoText}>Email: {profiles.email}</Text>
        <Text style={styles.infoText}>Phone Number: {profiles.phone_number}</Text>
        <Text style={styles.infoText}>Join_Date: {new Date(profiles.join_date).toLocaleDateString()}</Text>
        <Text style={styles.infoText}>Address: {profiles.address}</Text>
        <Text style={styles.infoText}>Interests: {profiles.interests}</Text>
        <Text style={styles.infoText}>Date of Birth: {profiles.dob}</Text>
        <Text style={styles.infoText}>Pronouns: {profiles.pronouns}</Text>
        <Text style={styles.infoText}>Postcode: {profiles.postcode}</Text>
        <Text style={styles.infoText}>Privacy: {profiles.private ? 'Personal Info Private' : 'Personal Info Public'}</Text>
        <Text style={styles.infoText}>Marketing: {profiles.want_marketing ? 'Opted In' : 'Opted Out'}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push({
          pathname: '/editProfile',
          query: { user_Id: userId },
        })}>
          <Text>Edit Profile</Text>
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
})