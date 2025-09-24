import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import axios from "axios";
import BottomNav from "@/PTComponents/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const ClubGuestsPage = () => {
  const router = useRouter();
  const [results, setresults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [memberDetails, setDetails] = useState([]);
  const [clubId, setClubId] = useState("");
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    if (userId == "") return;
    (async () => {
      try {
        const access = await axios.get(
          `${process.env.EXPO_PUBLIC_IP}/clubAccess/${userId}`
        );
        setClubId(access.data.club_id);
      } catch (error) {
        console.error("Error fetching club:", error);
        Alert.alert("Error", "Failed to load Club");
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (clubId == "") return;
    (async () => {
      try {
        // Step 1: Get club list from user info
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_IP}/allGuests/`
        );
        console.log(data);

        const MemberDetails = await Promise.all(
          data.map(async (item) => {
            const res = await axios.get(
              `${process.env.EXPO_PUBLIC_IP}/clubBoardMembers/${item.user_id}`
            );
            const fullName =
              res.data[0].first_name + " " + res.data[0].last_name;
            const id = res.data[0].user_id;
            const paid = res.data[0].paid;
            return {
              fullName,
              paid,
              id,
            };
          })
        );
        setDetails(MemberDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
        Alert.alert("Error", "Failed to fetch user details");
      }
    })();
  }, [clubId, useIsFocused()]);

  const Search = async () => {
    try {
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_IP}/clubBoardMembers/${id}`
      );
      setresults(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  if (!memberDetails) return;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View>
          <TouchableOpacity
            style={styles.Add}
            onPress={() =>
              router.push({
                pathname: "/board/club/addGuest",
              })
            }
          >
            <Text style={{ color: "blue", fontSize: 16 }}>+ Add Guest</Text>
          </TouchableOpacity>
        </View>
        {/* Member List */}
        {memberDetails.map((member, index) => (
          <TouchableOpacity
            key={index}
            style={styles.guestInfo}
            onPress={() =>
              router.push({
                pathname: "/profile/[profileID]",
                params: { profileID: member.id },
              })}
          >
            <Text style={styles.meetingName}>{member.fullName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav
        number={3}
        name={["Members", "Guests", "Meeting"]}
        link={[
          "/board/club/members",
          "/board/club/guests",
          "/board/club/meetings",
        ]}
        active={2}
      />
      {results.map((member, index) => (
        <Text key={index}>
          {member.first_name} {member.last_name} Paid: {member.paid}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  Add: {
    marginTop: 20,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    margin: 30,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  guestInfo: {
    marginTop: 15,
    backgroundColor: "#8A7D6A",
    padding: 15,
    borderRadius: 10,
  },
  paidTag: {
    fontWeight: "600",
    color: "#ffffff",
  },
  meetingName: {
    fontSize: 16,
    marginTop: 4,
    color: "#ffffff",
  },
});
export default ClubGuestsPage;
