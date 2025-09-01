import React from "react";

import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";
import Button from "@/PTComponents/Button";

export default function Sharing() {
  return (
    <View style={styles.background}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Tick to share with other members</Text>
        <View style={styles.contents}>
          <View style={styles.checkContainer}>
            <Checkbox />
          </View>
          <Text style={styles.label}>Share Email</Text>
        </View>
        <View style={styles.contents}>
          <View style={styles.checkContainer}>
            <Checkbox style={styles.check} />
          </View>
          <Text style={styles.label}>Share Phone Number</Text>
        </View>
        <View style={styles.function}>
                    <Button onPress={null}>Submit Changes</Button>
        
                    <Button onPress={() => router.back()}>Cancel Changes</Button>
                  </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
  },
  modalView: {
    width: "80%",
    marginTop: "25%",
    marginHorizontal: "10%",
    borderRadius: 25,
    backgroundColor: "#F1F6F5",
  },
  contents: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkContainer: {
    flex: 1,
    marginLeft: "5%",
  },
  label: {
    flex: 7,
  },
  title: {
    backgroundColor: "#065395",
    color: "#F1F6F5",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    fontSize: 20,
    padding: 10,
    marginBottom:10,
  },
  function: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
});
