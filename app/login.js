import React, { useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import FormContainer from "./components/FormContainer";
import FormLabel from "./components/FormLabel.js";
import FormInput from "./components/FormInput.js";
import Button from "./components/Button.js";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      website_login: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP}:8081/users/login`,
        {
          website_login: data.website_login.trim(),
          password: data.password.trim(),
        }
      );
      console.log(response.status);
      if (response.status == 401) {
        Alert.alert("Login Failed", response.data.message);
      } /*if (
        response.data[0].paid == "1" &&
        response.data[0].guest == "0" &&
        response.data[0].end_date > today
      ) */ else {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem("userId", response.data.user_id.toString());
        router.push({
          pathname: "/club_meeting"
        });
      }
      /*
      if (res.data[0].end_date < today) {
        const responses = await axios.post("http://localhost:8081/user/guest", {
          user_id: response.data.user_id,
        });*/
      console.log("Server response:", response.data);
      Alert.alert("Login Response", response.data.message);
    } catch (error) {
      if (error.response) {
        console.error("Server error response:", error.response.data);
        Alert.alert(
          "Error",
          error.response.data.message || "An error occurred"
        );
      } else {
        console.error("Network or other error:", error);
        Alert.alert("Error", "Failed to connect to server");
      }
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.gap}/>
      <FormContainer>
        <View style={styles.inputs}>
          {[
            {
              name: "website_login",
              placeholder: "Please enter your login",
              label: "Login",
              autocomplete: "username",
              rule: { required: "You must enter your login" },
              secure: false,
            },
            {
              name: "password",
              placeholder: "Please Enter Your Password",
              label: "Password",
              autocomplete: "current-password",
              rule: { required: "You must enter your password" },
              secure: true,
            },
          ].map(({ name, placeholder, label, autocomplete, rule, secure }) => (
            <View key={name} style={styles.inputGroup}>
              {label && <FormLabel>{label}</FormLabel>}
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    autoComplete={autocomplete}
                    placeholder={placeholder}
                    onChangeText={onChange}
                    secureTextEntry={secure}
                    value={value}
                    autoCapitalize="none"
                  />
                )}
                rules={rule}
              />
              {errors[name] && isSubmitted && (
                <Text style={styles.errorText}>{errors[name].message}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.function}>
          <Button onPress={() => router.push("./register")}>Register</Button>

          <Button onPress={
            handleSubmit(handleLogin)}>Login</Button>
        </View>
      </FormContainer>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#AFABA3",
    height: "100%",
  },
  inputs: {
    marginHorizontal: 20,
  },
  function: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
  },
  gap: {
    paddingTop: '30%',
  }
});
