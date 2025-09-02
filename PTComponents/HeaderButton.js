import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const HeaderButton = (props) => {
  return (
    <TouchableOpacity style={styles.Button} {...props}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#FFD347",
    width: 80,
    height: 60,
    borderRadius: 6,
    marginVertical:15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
