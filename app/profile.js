import React, { useEffect, useState } from 'react';
import { Text, View, Alert, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userId, setUserId] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [clubNames, setClubName] = useState([]);
  const [emails, setEmail]= useState(null);
  // Load userId from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const Email= await AsyncStorage.getItem('email');
        if (storedUserId && Email) {
          setUserId(storedUserId);
          setEmail(Email);
        }
      } catch (error) {
        console.error('Error fetching userId from storage:', error);
        Alert.alert('Error', 'Failed to load user ID');
      }
    })();
  }, []);

  // Fetch user and club info
  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        // Step 1: Get club list from user info
        const { data } = await axios.get(`http://10.128.201.19:8081/user/${userId}`);
        const clubList = data.Club_id || [];
      
        setClubs(clubList);

        // Step 2: Fetch names for all clubs
        const clubDetails = await Promise.all(
          clubList.map(async (item) => {
            const res = await axios.get(`http://10.128.201.19:8081/club/${item.Club_id}`);
            return {
              Club_name: res.data.Club_name[0].Club_name
            };
          })
        );

        setClubName(clubDetails);
      } catch (error) {
        console.error('Error fetching user or club data:', error);
        Alert.alert('Error', 'Failed to fetch user or club data');
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
      <Text style={styles.welcome}>Welcome to Dashboard, {emails}</Text>
      {clubNames.map((club ,index)=>(
      <TouchableOpacity key={index} style={styles.button}>Club {club.Club_name}</TouchableOpacity>))}
       </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'flex-start',
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 20,
  },
  welcome:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft: 320,
    marginBottom:20,
  },
  button: {
    backgroundColor: 'orange',
    width: 200,           
    height: 50,           
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 20,
    marginLeft: 500,}
});
export default ProfileScreen;
