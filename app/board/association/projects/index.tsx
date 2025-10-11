import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function profile() {
  const [userId, setUserId] = useState("");
  const router = useRouter();
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

  useEffect(() => {
    if (userId=="") return;
    router.replace({
      pathname: "/projects/[projectUserID]",
      params:{projectUserID: userId}
    })
  }, [userId]);

  return(null);
}
