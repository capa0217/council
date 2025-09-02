import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8A7D6A",
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 10, // Adds top and bottom spacing
    marginHorizontal: 15,
  },
  text: {
    color: "#ffffff",
  },
});
