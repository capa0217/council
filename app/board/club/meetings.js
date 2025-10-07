import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomNav from "@/PTComponents/BottomNav";
import Pencil from "@/PTComponents/Pencil";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const router = useRouter();
  const nav = useNavigation();

  const [userId, setUserId] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [clubMeetings, setClubwithMeetings] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [selectedClub, setSelectedClub] = useState("All Clubs");
  const [id, setid] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
        Alert.alert("Error", "Failed to load user ID");
      }
    })();
  }, []);

  // Fetch user and club info
  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        // Step 1: Get club list from user info
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_IP}/clubAccess/${userId}`
        );
        const clubList = data.club_id || [];
        setClubs(clubList);

        const resMeet = await axios.get(
          `${process.env.EXPO_PUBLIC_IP}/meeting/${clubList}`
        );
        setClubwithMeetings(resMeet.data);
        setid(resMeet.data.meeting_id);
      } catch (error) {
        console.error("Error fetching user or club data:", error);
        Alert.alert("Error", "Failed to fetch user or club data");
      }
    })();
  }, [userId]);

  useEffect(() => {
    nav.setOptions({ headerShown: true, title: "Upcoming Meetings" });
  });

  const handlePress = async (meetingId) => {
    router.push(`club/meetings/${meetingId}`);
  };

  const handlePre = async (meetingId) => {
    try {
      await AsyncStorage.setItem("meetingId", meetingId.toString());
      router.push(`board/club/editMeeting/${meetingId}`);
    } catch (error) {
      console.error("Error saving meeting_id:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.add}
          onPress={() => router.push("/board/club/addMeeting")}
        >
          <Text style={styles.addText}>+ Add new meeting</Text>
        </TouchableOpacity>

        {/* Sorting Dropdowns */}
        <View style={styles.sortingRow}>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            <Picker.Item label="Year" value="Year selected" />
          </Picker>

          <Picker
            selectedValue={selectedYear}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            <Picker.Item label="Month" value="Month selected" />
          </Picker>

          <Picker
            selectedValue={selectedClub}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedClub(itemValue)}
          >
            <Picker.Item label="Select Club" value="Club selected" />
          </Picker>
        </View>

        {/* Meeting Buttons */}
        {clubMeetings.map((meeting, index) => {
          const d = new Date(meeting.meeting_date);

          const dayName = new Intl.DateTimeFormat("en-AU", {
            weekday: "long",
            timeZone: "Australia/Sydney",
          }).format(d);

          const dateStr = new Intl.DateTimeFormat("en-AU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Australia/Sydney",
          }).format(d);
          return (
            <View key={meeting.meeting_id} style={styles.row}>
              <TouchableOpacity onPress={() => handlePre(meeting.meeting_id)}>
                <Pencil />
              </TouchableOpacity>
              <TouchableOpacity
                key={index}
                style={styles.meetingBlock}
                onPress={() => handlePress(meeting.meeting_id)}
              >
                <Text style={styles.meetingClub}>
                  {meeting.meetingname} #{meeting.meeting_id}
                </Text>
                <Text style={styles.meetingClub}>
                  Date: {dateStr} {dayName}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        number={3}
        name={["Members", "Guests", "Meeting"]}
        link={[
          "/board/club/members",
          "/board/club/guests",
          "/board/club/meetings",
        ]}
        active={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    marginTop: 20,
  },
  add: {
    marginTop: 20,
  },
  addText: {
    color: "#065395",
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#AFABA3",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 50,
    right: 80,
    resizeMode: "contain",
  },
  profileText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,

    marginBottom: 20,  },
  symbol: {
    fontSize: 40,
  },
  meetingHeaderBlock: {
    marginTop: 100,
    backgroundColor: "#065395",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
    zIndex: -9999,
  },
  meetingHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  sortingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  meetingBlock: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#8A7D6A",
  },
  meetingClub: {
    fontWeight: "600",
    color: "#ffffff",
    fontSize: 20,
  },
  meetingName: {
    fontSize: 16,
    marginTop: 4,
    color: "#ffffff",
  },
  meetingDate: {
    fontSize: 14,
    color: "#E0E0E0",
    marginTop: 2,
  },
  logoContainer: {
    backgroundColor: "#F1F6F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    zIndex: 10, // Ensure it's layered correctly
  },
  warning: {
    textAlign: "center",
    paddingTop: 280,
    paddingBottom: 300,
    fontSize: 25,
  },
});

export default ProfileScreen;
