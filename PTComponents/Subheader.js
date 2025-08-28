import { canGoBack } from "expo-router/build/global-state/routing";
import { Text, View, StyleSheet } from "react-native";
import BackButton from "./BackButton";

import React from "react";
import Button from "./Button";

const Subheader = (options) => {
  return (
    <View style={styles.Subheader}>
      {canGoBack() && (
        <BackButton style={styles.Back}/>
      )}
      <Text style={styles.Title}>{options.title}</Text>
    </View>
  );
};

export default Subheader;

const styles = StyleSheet.create({
  Subheader: {
    backgroundColor: "#065395",
    paddingVertical: 15,
    paddingHorizontal:5,
    borderRadius: 10,
    flexDirection: "row"
  },
  Title: {
    marginLeft:10,
    marginTop:5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    flex:20,
  },
  Back: {
    flex:1
  },
});
