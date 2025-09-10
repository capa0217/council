import React, { useState, useEffect } from "react";
import { Text, View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import FormContainer from "./components/FormContainer";
import FormLabel from "./components/FormLabel.js";
import FormInput from "./components/FormInput.js";
import Button from "./components/Button.js";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useKeyboard } from "@react-native-community/hooks";

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

  const keyboard = useKeyboard();
  const [height, setHeight] = useState(50);
  useEffect(() => {
    if (keyboard.keyboardShown) {
      setHeight(10);
    } else {
      setHeight(50);
    }
  });

  const handleLogin = async (data) => {
    try {
      const login = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP}:8081/users/login`,
        {
          website_login: data.website_login.trim(),
          password: data.password.trim(),
        }
      );
      const member = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP}:8081/member/${login.data.user_id}`
      );
      const clubAccess = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP}:8081/clubAccess/${member.data.User_id}`
      );

      console.log(member.data.User_id);
      console.log(member.data.paid);

      if (member.status == 401) {
        Alert.alert("Login Failed", member.data.message);
      } else if (
        member.data.paid == "1" &&
        member.data.guest == "0" &&
        clubAccess.data.position == null
      ) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem("userId", member.data.user_id.toString());
        router.push({
          pathname: "/club_meeting",
          query: { userId: member.data.user_id },
        });
      } else if (
        member.data.paid == "1" &&
        member.data.guest == "0" &&
        clubAccess.data.position != null
      ) {
        await AsyncStorage.setItem("userId", member.data.user_id.toString());
        router.push({
          pathname: "./BoardMember",
          query: { userId: member.data.user_id },
        });
      } else if (
        (member.data.paid == "0" &&
          member.data.guest == "1" &&
          clubAccess.data.position == null) ||
        (member.data.paid == "1" &&
          member.data.guest == "1" &&
          clubAccess.data.position == null)
      ) {
        await AsyncStorage.setItem("userId", member.data.user_id.toString());
        router.push({
          pathname: "./GuestPage",
          query: { userId: member.data.user_id },
        });
      }

      console.log("Server Response:", login.data);
      Alert.alert("Login Response", login.data.message);
    } catch (error) {
      if (error.login) {
        console.error("Server error response:", error.login.data);
        Alert.alert(
          "Error",
          error.login.data.message || "An error occurred"
        );
      } else {
        console.error("Network or other error:", error);
        Alert.alert("Error", "Failed to connect to server");
      }
    }
  };

  return (
    <View style={styles.background}>
      <FormContainer>
        <View style={styles.inputs}>
          {[
            {
              name: "website_login",
              placeholder: "Please enter your login",
              label: "Website-Login",
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

          <Button onPress={handleSubmit(handleLogin)}>Login</Button>
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
});
