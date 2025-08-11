import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function Route() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    console.log("Hello");
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
  return (
    <Redirect
      href={{
        pathname: "/profile/[profileID]",
        params: { profileID: userId },
      }}
    />
  );
}
