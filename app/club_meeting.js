import React, { useEffect, useState } from 'react';
import { Text, View, Alert, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userId, setUserId] = useState(null);
  const [clubs, setClubs] = useState([]);
 const [clubMeetings, setClubwithMeetings]= useState([]);
  // Load userId from AsyncStorage
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

  // Fetch user and club info
  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        // Step 1: Get club list from user info
        const { data } = await axios.get(`http://192.168.1.107:8081/user/${userId}`);
        const clubList = data.Club_id || [];
      
        setClubs(clubList);

        // Step 2: Fetch names for all clubs
        const clubMeetingDetails = await Promise.all(
          clubList.map(async (item) => {
            const res = await axios.get(`http://192.168.1.107:8081/club/${item.Club_id}`);
            const clubNames= res.data.Club_name[0].Club_name
            const resMeet = await axios.get(`http://192.168.1.107:8081/meeting/${item.Club_id}`);
            const MeetNames= resMeet.data;
            return {
              clubNames,
              MeetNames,
            };
          })
        );
          console.log(clubMeetingDetails);

        setClubwithMeetings(clubMeetingDetails); 

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
   {clubMeetings.map((club, index) => (
  <View key={index}>
    <Text style={{ fontWeight: 'bold' }}>Club: {club.clubNames}</Text>
    
    {club.MeetNames.map((meeting, idx) => {
      const date = new Date(meeting.meeting_date).toISOString().split('T')[0];
      return (
        <TouchableOpacity key={idx} style={styles.button}>
          <Text>{meeting.meetingname} - {date}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
))}


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
