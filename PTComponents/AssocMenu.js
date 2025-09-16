import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const AsscociationMenu = () => (
  <View style={styles.containers}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => router.push("/board/association/club/members/")}
      >
        <Text style={styles.name}>Members</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => router.push("/board/association/club/guests/")}
      >
        <Text style={styles.name}>Guest</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => router.push("/board/association/club/boardMembers/")}
      >
        <Text style={styles.name}>Board</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => router.push("/board/association/club/councilMembers/")}
      >
        <Text style={styles.name}>Council</Text>
      </TouchableOpacity>
  </View>
);
export default AsscociationMenu;

const styles = StyleSheet.create({
  containers: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
  },
  buttons: {
    backgroundColor:"#065395",
    padding:10,
    flex:1,
    borderWidth:1,
    borderRadius:5,
    borderColor:"white",
    alignItems:"center",
  },
  name: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
