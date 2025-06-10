import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function Test() {
  const [userId, setUserId] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('message');
        if (storedUserId) {
          const parsedUser = JSON.parse(storedUserId);
          if (parsedUser) {
            setUserId(parsedUser);
            setCount((prev) => prev + 1);
          }
        }
      } catch (error) {
        console.error('Error fetching userId from storage:', error);
        Alert.alert('Error', 'Failed to load user ID');
      }
    };

    fetchUserId();
  }, []);

  const sendMessage = useCallback(async () => {
    try {
      const response = await axios.post('http://192.168.1.110:8081/send-messages', {
        senderId: userId.user_id,
      });
      if(userId.paid =='0'){
      const messages = response.data;
      messages.push({ text: 'Please pay to join this club' });

      await AsyncStorage.setItem('messages', JSON.stringify(messages));
      }
      else{
         const responses = await axios.post('http://192.168.1.110:8081/user/member', {
        user_id: userId.user_id
      });
      }
      Alert.alert('Success', 'Message sent');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send message');
    }
  }, [userId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="envelope" size={30} color="black" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      </View>

      <Text style={styles.header}>Your Message</Text>
      <Text style={styles.label}>Sender ID: <Text style={styles.value}>{userId.user_id}</Text></Text>
      <Text style={styles.label}>Sender Name: <Text style={styles.value}>{userId.first_name} {userId.last_name}</Text></Text>
      <Text style={styles.label}>Paid: <Text style={styles.value}>{userId.paid?.toString()}</Text></Text>
      <Text style={styles.label}>Guest: <Text style={styles.value}>{userId.guest?.toString()}</Text></Text>

      <TouchableOpacity onPress={sendMessage} style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  iconContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  badge: {
    position: 'absolute',
    left: 22,
    top: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
