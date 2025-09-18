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
import BottomNav from "@/PTComponents/BottomNav"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const BoardMemberpage = () => {
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
          console.log(`Hello There Fellow : ${storedUserId}`);
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
    console.log(`Hello There : ${userId}`);
        const access = await axios.get(
          `${process.env.EXPO_PUBLIC_IP}/clubAccess/${userId}`
        );
        setClubId(access.data.club_id);
        console.log(`club: ${access.data.club_id}`);
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
        console.log(`Hello There MY fgood Bfello: ${clubId}`);
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_IP}/clubBoard/${clubId}`
        );

        const MemberDetails = await Promise.all(
          data.map(async (item) => {

            const res = await axios.get(
              `${process.env.EXPO_PUBLIC_IP}/clubBoardMembers/${item.User_id}`
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
        console.log(memberDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
        Alert.alert("Error", "Failed to fetch user details");
      }
    })();
  }, [clubId]);

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
  const AddMember = async () => {
    try {
      const access = await axios.get(
        `${process.env.EXPO_PUBLIC_IP}/clubAccess/${userid}`
      );
      const accesses = access.data;

      if (accesses) {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_IP}/BoardMember`,
          {
            Club_id: 1,
          }
        );
      } else {
        console.log("You can not add member");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add member data");
    }
  };
  if (!memberDetails) return;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View>
          <TouchableOpacity
            style={styles.Add}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "blue", fontSize: 16 }}>+ Add member</Text>
          </TouchableOpacity>
        </View>
        {/* Member List */}
        {memberDetails.map((member, index) => (
          <TouchableOpacity
            key={index}
            style={styles.meetingBlock}
            onPress={() => Alert.alert("Member Selected", member.fullName)}
          >
            <Text style={styles.meetingName}>
              {member.fullName} <Text>Paid: {member.paid ? "Yes" : "No"}</Text>{" "}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNav number={3} name={["Members", "Guests", "Meeting"]} link={["/board/club/members", "/board/club/guests", "/board/club/meetings"]} active={1} />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade" // or 'fade' or 'none'
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={AddMember}>
              <Text>Add member</Text>
            </TouchableOpacity>

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    marginLeft: 1080,
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
    resizeMode: "contain",
  },
  profileText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  meetingHeaderBlock: {
    marginTop: 20,
    backgroundColor: "#065395",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    position: 'relative',
    zIndex: -5,
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
    marginTop: 15,
    backgroundColor: "#8A7D6A",
    padding: 15,
    borderRadius: 10,
  },
  meetingClub: {
    fontWeight: "600",
    color: "#ffffff",
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F1F6F5",
    paddingVertical: 15,
  },
  navButton: {
    fontSize: 16,
    color: "#333",
  },
  activeButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
export default BoardMemberpage;
