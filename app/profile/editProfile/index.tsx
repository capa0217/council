import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function editProfile() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
        console.log(userId);
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
        Alert.alert("Error", "Failed to load user ID");
      }
    })();
  }, []);

  if (userId) {
    return (
      <Redirect
        href={{
          pathname: "/profile/editProfile/[profileID]",
          params: { profileID: userId },
        }}
      />
    );
  }
}
