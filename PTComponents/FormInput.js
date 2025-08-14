import React from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";

const FormInput = (props) => {
  return (
    <KeyboardAvoidingView>
      <TextInput style={styles.formInput} {...props} />
    </KeyboardAvoidingView>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  formInput: {
    borderWidth: 2,
    borderColor: "#433D33",
    width: "100%",
    height: 50,
    marginTop: "1%",
    paddingLeft: 10,
  },
});
