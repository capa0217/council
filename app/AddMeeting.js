import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import FormContainer from "./components/FormContainer";
import FormLabel from "./components/FormLabel.js";
import FormInput from "./components/FormInput.js";
import Button from "./components/Button.js";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useKeyboard } from "@react-native-community/hooks";

const EditForm = () => {
  const router = useRouter();
  const [meeting, setMeeting] = useState([]);
  const [loading, setLoading] = useState(true);
    const [meetingId, setMeetingId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [name, setname]= useState(null);
  const [place, setplace]= useState(null);
  const [date, setdate]= useState(null);
   const [dates, setdates]= useState(null);
  const [start, setStart] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [links, setlinks] = useState(null);
  const [instruct, setInstruct] = useState(null);
    const [clubs, setClubs] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          console.log(storedUserId);
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
        const storedMeetingId = await AsyncStorage.getItem('meetingId');
        if (storedMeetingId) {
          console.log(storedMeetingId);
          setMeetingId(storedMeetingId);
        }
      } catch (error) {
        console.error('Error fetching meetingId from storage:', error);
        Alert.alert('Error', 'Failed to load meeting ID');
      }
    })();
  }, []);
  useEffect(() => {
    if (!userId) return;
    if (userId) {
      axios.get(`http://172.20.10.2:8081/clubAccess/${userId}`)
        .then(res => {
          console.log(res.data)
        const clubList = res.data.club_id;
        console.log(clubList)
        setClubs(clubList);
        })
        .catch(err => {
          console.error('Error fetching meeting details:', err);
          setLoading(false);
        });
    }
  }, [userId]);
   useEffect(() => {
     if (meeting.length > 0) {
             const m = meeting[0]; // assuming one meeting

      const d = new Date(m.meeting_date);

  const dateStr = new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Australia/Sydney',
  }).format(d);
       setname(m.meetingname);
       setplace(m.meeting_place);
       setdate(dateStr);
       setStart(m.start_time);
       setArrival(m.arrival_time);
       setlinks(m.agenda_file_link);
       setInstruct(m.entry_instructions);
     }

   }, [meeting]);
   console.log(name);
  const Edit  = async () =>{

    try {
      const access = await axios.post(
        `http://172.20.10.2:8081/meeting/add`, 
        {
          club_id: clubs,
          meetingname : name,
          meetingplace: place,
          meetingdate: auToIso(date),
          meetingstarttime: start,
          meetingarrivaltime: arrival,
          link : links,
          instructions: instruct
        }
      );

      console.log(access);
    } catch (error) {
      Alert.alert("Error", "Failed to add member data");
      console.log(error);
    }

  }
  function auToIso(date) {        // "02/10/2025" -> "2025-10-02"
  const [dd, mm, yyyy] = date.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

  return (
    <View style={styles.background}>
      
      <FormContainer>
        <View style={styles.inputs}>
          <FormLabel>Name:</FormLabel>
        <View 
             style={styles.inputGroup}>
        <FormInput
      
        placeholder="MeetingName"
        
        onChangeText ={setname}
      /> 
      
      </View>
    
        </View>
   <View style={styles.inputs}>
           <FormLabel>Date:</FormLabel>
            <View 
             style={styles.inputGroup}>

      <FormInput
        
        placeholder="Date"
       
        onChangeText = {setdate}
      />
      </View>
      
    </View>
    <View style={styles.inputs}>
           <FormLabel>Start Time:</FormLabel>
            <View 
             style={styles.inputGroup}>

      <FormInput
        
        placeholder="Start Time"
       
        onChangeText = {setStart}
      />
      </View>
      
    </View>
    <View style={styles.inputs}>
           <FormLabel>Arrival Time:</FormLabel>
            <View 
             style={styles.inputGroup}>

      <FormInput
        
        placeholder="Arrival Time"
       
        onChangeText = {setArrival}
      />
      </View>
      
    </View>
    <View style={styles.inputs}>
      <FormLabel>Place: </FormLabel>
             <View
             style={styles.inputGroup}>
             
      <FormInput
        placeholder="Place"
        
        onChangeText = {setplace}
      />

      </View>
        </View>
        <View style={styles.inputs}>
                <FormLabel>Program: </FormLabel>

            <View 
             style={styles.inputGroup}>
             
      <FormInput
      
        placeholder="Link"
  
        onValueChange ={setlinks}
      />
      
      </View>
        </View>
        <View style={styles.inputs}>
                <FormLabel>Note: </FormLabel>

             <View 
             style={styles.inputGroup}>
             
      <FormInput
        placeholder="Note"
      
        onValueChange = {setInstruct}
      />
      
      </View>
        </View>
        <View style={styles.buttons}>

           <TouchableOpacity style={styles.contents} onPress={() => router.push('./ClubBoardMemberMeeting')}>Cancel</TouchableOpacity>
        <TouchableOpacity style={styles.contents} onPress={Edit}> Add</TouchableOpacity>
        </View>
       
  </FormContainer>
    </View>
  );
}
export default EditForm;

const styles = StyleSheet.create({
  buttons:{
     display:'flex',
     flexDirection:'row',
     gap:100,
     marginRight:"auto",
     marginLeft:"auto"
  },
  background: {
    backgroundColor: "#AFABA3",
    height: "100%",
    justifyContent:'space-between',
    flexDirection:'column'
  },
  contents:{
    backgroundColor: "#FFD347",
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 10, // Adds top and bottom spacing
    marginHorizontal: 15,
  },
  inputs:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft:250
  },
  inputGroup:{
          flex: 0.75,                 
    alignSelf: 'stretch',
    left:10
  },
  function: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
  },
});
