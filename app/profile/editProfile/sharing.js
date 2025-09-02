import React from "react";

import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";
import Button from "@/PTComponents/Button";

import { useState } from "react";

export default function Sharing() {
  const [showPhone, setPhone] = useState(false);
  const [showAddress, setAddress] = useState(false);
  
  handleSubmit()

  return (
    <View style={styles.background}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Tick to share with other members:</Text>
        <View style={styles.contents}>
          <View style={styles.checkContainer}>
            <Checkbox value={showPhone} onValueChange={setPhone}
          color={showPhone ? '#FFD347' : undefined}></Checkbox>
          </View>
          <Text style={styles.label}>Share Email</Text>
        </View>
        <View style={styles.contents}>
          <View style={styles.checkContainer}>
            <Checkbox value={showAddress} onValueChange={setAddress}
          color={showAddress ? '#FFD347' : undefined}></Checkbox>
          </View>
          <Text style={styles.label}>Share Phone Number</Text>
        </View>
        <View style={styles.function}>
          <Button onPress={()=>handleSubmit()}>Done</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  modalView: {
    alignSelf: "center",
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
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  },
  function: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
});
