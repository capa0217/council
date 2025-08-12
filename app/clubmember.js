import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import BottomNav from "./components/BottomNav";
import PTHeader from "./components/PTHeader";
import { router } from "expo-router";

const ClubMembersPage = () => {
  const navigation = useNavigation();
  const [memberdetails, setDetails] = useState([]);
  const [sortByName, setSortByName] = useState("A-Z");
  const [selectedClub, setSelectedClub] = useState("All Clubs");
  const [clubs, setClubs] = useState([]);
  const [ids, setids] = useState([]);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [clubBoardData, setClubBoardData] = useState([]);
  const members = [
    { name: "Susan connor", club: "Sunshine Club" },
    { name: "Rick Novak", club: "Riverside Club" },
    { name: "Jeff Johnson", club: "Brisbane Club" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://${process.env.EXPO_PUBLIC_IP}:8081/members`
        );

        setDetails(res.data.user);
      } catch (error) {
        console.error("Error fetching user or club data:", error);
        Alert.alert("Error", "Failed to fetch user or club data");
      }
    })();
  }, []);

  useEffect(() => {
    axios
      .get(`http://${process.env.EXPO_PUBLIC_IP}:8081/clubs`)
      .then((res) => setClubs(res.data))
      .catch((err) => {
        console.error("Error fetching clubs:", err);
        Alert.alert("Error", "Failed to fetch clubs");
      });
  }, []);
  useEffect(() => {
    if (!selectedClubId) return;
    axios
      .get(`http://${process.env.EXPO_PUBLIC_IP}/clubBoard/${selectedClubId}`)
      .then((res) => setids(res.data))
      .catch((err) => {
        console.error("Error fetching clubs:", err);
        Alert.alert("Error", "Failed to fetch clubs");
      });
  }, [selectedClubId]);

  const sortedMembers = memberdetails.sort((a, b) => {
    if (sortByName == "A-Z") {
      const firstCompare = a.first_name.localeCompare(b.first_name);
      if (firstCompare !== 0) {
        return firstCompare;
      } else {
        return a.last_name.localeCompare(b.last_name);
      }
    }
  });
  const unsortedMembers = memberdetails.sort((a, b) => {
    if (sortByName == "Z-A") {
      const firstCompare = b.first_name.localeCompare(a.first_name);
      if (firstCompare !== 0) {
        return firstCompare;
      } else {
        return b.last_name.localeCompare(a.last_name);
      }
    }
  });

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <PTHeader button={true} text={"Profile"} link={"profile"} />

      <ScrollView style={styles.content}>
        {/* Header Block */}
        <View style={styles.meetingHeaderBlock}>
          <Text style={styles.meetingHeaderText}>Club Members</Text>
        </View>

        {/* Sorting Dropdowns */}
        <View style={styles.sortingRow}>
          <Picker
            selectedValue={sortByName}
            style={styles.picker}
            onValueChange={(itemValue) => setSortByName(itemValue)}
          >
            <Picker.Item label="A-Z" value="A-Z" />
            <Picker.Item label="Z-A" value="Z-A" />
          </Picker>

          <Picker
            selectedValue={selectedClub}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedClub(itemValue);

              const clubObj = clubs.find(
                (club) => club.Club_name === itemValue
              );
              if (clubObj) {
                setSelectedClubId(clubObj.Club_id);
              }
            }}
          >
            <Picker.Item label="All Clubs" value="All Clubs" />
            {clubs.map((club) => (
              <Picker.Item
                key={club.Club_id}
                label={club.Club_name}
                value={club.Club_name}
              />
            ))}
          </Picker>
        </View>

        {(selectedClub === "All Clubs"
          ? memberdetails
          : memberdetails.filter((member) =>
              ids.some((idObj) => idObj.User_id === member.user_id)
            )
        ).map((member) => (
          <TouchableOpacity
            key={member.user_id}
            style={styles.meetingBlock}
            onPress={() =>
              Alert.alert(
                "Member Selected",
                `${member.first_name} ${member.last_name}`,
                [
                  {
                    text: "Close",
                  },
                  {
                    text: "View Profile",
                    onPress: () => router.push("/profile"),
                  },
                ]
              )
            }
          >
            <Text style={styles.meetingName}>
              {member.first_name} {member.last_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav active={1} />
    </View>
  );
};

export default ClubMembersPage;

const styles = StyleSheet.create({
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
  meetingName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
