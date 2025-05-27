import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const MeetingDetails = () => {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
  
 useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('meetingId');
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
    if (userId) {
      axios.get(`http://10.128.201.19:8081/meeting_details/${userId}`)
        .then(res => {
          setMeeting(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching meeting details:', err);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;

  if (!meeting) return <Text style={styles.errorText}>Meeting not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meeting Details</Text>
      <Text style={styles.label}>Club: <Text style={styles.value}>{meeting.club}</Text></Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{meeting.name}</Text></Text>
      <Text style={styles.label}>Date: <Text style={styles.value}>{meeting.meeting_date}</Text></Text>
      <Text style={styles.label}>Location: <Text style={styles.value}>{meeting.location}</Text></Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.description}>{meeting.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  value: {
    fontWeight: '400',
  },
  description: {
    fontSize: 15,
    marginTop: 5,
    lineHeight: 22,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    marginTop: 50,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default MeetingDetails;
