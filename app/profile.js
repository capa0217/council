import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Text, View, Alert, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const router = useRouter();
const [userId, setUserId] = useState(null);
const [profiles, setProfiles]= useState([]);
 useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId ) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error fetching userId from storage:', error);
        Alert.alert('Error', 'Failed to load user ID');
      }
    })();
  }, []);

  useEffect(()=>{
    (async () => {
        try{
             const res = await axios.get(`http://192.168.1.107:8081/profile/${userId}`);
              setProfiles(res.data);
              console.log(res.data);
        }catch (error) {
        console.error('Error fetching userId from storage:', error);
        Alert.alert('Error', 'Failed to load user ID');
      }
    })();
  },[userId]);
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
  <Text style={styles.infoText}>First_name: {profiles.first_name}</Text>
  <Text style={styles.infoText}>Email: {profiles.email}</Text>
  <Text style={styles.infoText}>Phone Number: {profiles.phone_number}</Text>
  <Text style={styles.infoText}>Join_Date: {new Date(profiles.join_date).toLocaleDateString()}</Text>
</View>
</View>
)}

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
  },})