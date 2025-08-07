import React from "react";
import { Text, StyleSheet } from "react-native";

const FormLabel = (props) => {
  return <Text style={styles.formLabel}>{props.children}</Text>;
};

export default FormLabel;

const styles = StyleSheet.create({
  formLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
});
