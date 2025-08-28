import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React = require("react");

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome to POWERTalk Australia</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./login")}
      >
        <Text style={styles.buttonText}>Let's get started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start",
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFD347",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
