import React, { useEffect, useState } from 'react';
import { Text, View, Alert, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const PORT = 8081;

const BoardMemberpage= ()=>{
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
const flattenedMeetings = clubMeetingDetails.flatMap((club) =>
  club.MeetNames.map((meeting) => ({
    club: club.clubNames,
    name: meeting.meetingname,
    date: meeting.meeting_date,
  }))
);
        setClubwithMeetings(flattenedMeetings); 

      } catch (error) {
        console.error('Error fetching user or club data:', error);
        Alert.alert('Error', 'Failed to fetch user or club data');
      }
    })();
  }, [userId]);
    return(
<View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={{ uri: 'https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png' }}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => router.push({
          pathname: '/profile',
          query: { user_Id: userId },
        })}>
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Meeting Header Block */}
        <View style={styles.meetingHeaderBlock}>
          <Text style={styles.meetingHeaderText}>Members</Text>
        </View>
        <TouchableOpacity></TouchableOpacity>

        </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#AFABA3',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
  },
  profileText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  meetingHeaderBlock: {
    marginTop: 20,
    backgroundColor: '#065395',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  meetingHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sortingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  meetingBlock: {
    marginTop: 15,
    backgroundColor: '#8A7D6A',
    padding: 15,
    borderRadius: 10,
  },
  meetingClub: {
    fontWeight: '600',
    color: '#ffffff',
  },
  meetingName: {
    fontSize: 16,
    marginTop: 4,
    color: '#ffffff',
  },
  meetingDate: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F1F6F5',
    paddingVertical: 15,
  },
  navButton: {
    fontSize: 16,
    color: '#333',
  },
  activeButton: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
export default BoardMemberpage;
