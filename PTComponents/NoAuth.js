
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const NoAuthentication = () => {
  const router = useRouter();
  return (
        <TouchableOpacity
          style={styles.warning}
          onPress={() => router.push("/login")}
        >
          <Text>
            Warning: You need to become a member and do the login to see this
            content
          </Text>
        </TouchableOpacity>
  );
};

export default NoAuthentication;

const styles = StyleSheet.create({
  warning: {
    textAlign: "center",
    paddingTop: 280,
    paddingBottom: 300,
    fontSize: 25,
  },
});
