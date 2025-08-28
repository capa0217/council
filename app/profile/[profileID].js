import React, { useEffect, useState } from "react";
import axios from "axios";

import { Text, View, Alert, StyleSheet, ScrollView } from "react-native";
import Button from "@/PTComponents/Button";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

import Checkbox from "expo-checkbox";

import { useLocalSearchParams } from "expo-router";

const PORT = 8081;

const Profile = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [access, setAccess] = useState(false);
  
  const [isChecked, setChecked] = useState(false);

  const local = useLocalSearchParams();
  const nav = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          console.log(storedUserId);
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
        Alert.alert("Error", "Failed to load user ID");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (userId) {
          const res = await axios.get(
            `http://${process.env.EXPO_PUBLIC_IP}:8081/clubaccess/${userId}`
          );
          if (res.status == 200) {
            setAccess(true);
          }
        }
      } catch (err) {
        console.error("Error With Club Access:", err);
        Alert.alert("Error", err);
      }
    })();
  }, [userId]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://${process.env.EXPO_PUBLIC_IP}:8081/profile/${local.profileID}`
        );
        setProfiles(res.data);
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
        Alert.alert("Error", "Failed to load user ID");
      }
    })();
  }, []);

  useEffect(() => {
    nav.setOptions({ headerShown: true })
    if (userId == local.profileID.toString()) {
      setAccess(true);
      nav.setOptions({
        title: `Your Profile`,
      });
    } else {
      nav.setOptions({
        title: `Profile of ${profiles.first_name} ${profiles.last_name}`,
      });
    }
  });

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.function}>
            {access && (
              <Button
                onPress={() => {
                  nav.setOptions({
                    headerShown: false,
                  })
                  router.navigate({
                    pathname: "/profile/editProfile/[profileID]",
                    params: { profileID: local.profileID.toString() },
                  });
                }
                }
              >
                Edit Profile
              </Button>
            )}
          </View>
        <View style={styles.information}>
          <Text style={styles.infoText}>Member_id: {profiles.user_id}</Text>
          <Text style={styles.infoText}>Email: {profiles.email}</Text>
          {profiles.phone_number && access && (
            <Text style={styles.infoText}>
              Phone Number: {profiles.phone_number}
            </Text>
          )}
          <Text style={styles.infoText}>
            Join_Date: {new Date(profiles.join_date).toLocaleDateString()}
          </Text>
          {profiles.address && access && (<View style={styles.checkContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.infoText}>Address: {profiles.address}</Text>

          </View>
          )}
          {profiles.postcode && access && (
            <Text style={styles.infoText}>Postcode: {profiles.postcode}</Text>
          )}
          {profiles.interests && (
            <Text style={styles.infoText}>Interests: {profiles.interests}</Text>
          )}
          {profiles.dob && access && (
            <Text style={styles.infoText}>
              Date of Birth: {new Date(profiles.dob).toLocaleDateString()}
            </Text>
          )}
          {profiles.pronouns && (
            <Text style={styles.infoText}>Pronouns: {profiles.pronouns}</Text>
          )}
          {access && (
            <Text style={styles.infoText}>
              Privacy:{" "}
              {profiles.private
                ? "Personal Info Private"
                : "Personal Info Public"}
            </Text>
          )}
          {access && (
            <Text style={styles.infoText}>
              Marketing: {profiles.want_marketing ? "Opted In" : "Opted Out"}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#AFABA3",
    height: "100%",
  },
  title: {
    padding: 10,
    backgroundColor: "#8A7D6A",
  },
  information: {
    padding: 10,
    backgroundColor: "#F1F6F5",
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
  },
  container: {
    padding: 20,
    alignItems: "flex-start",
  },
  checkContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    padding:5,
    margin: 5,
  },
  function: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  titleText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});
