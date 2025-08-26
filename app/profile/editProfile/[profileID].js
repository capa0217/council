import { useEffect, useState } from "react";
import axios from "axios";

import {
  Text,
  View,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

import FormContainer from "@/PTComponents/FormContainer";
import FormLabel from "@/PTComponents/FormLabel";
import FormInput from "@/PTComponents/FormInput";
import Button from "@/PTComponents/Button";

import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";
import React from "react";

const EditProfile = () => {
    const fields = {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      postcode: "",
      interests: "",
      dob: "",
      pronouns: "",
      private: false,
      want_marketing: false,
    }
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm ({
    defaultValues: fields,
  });

  const router = useRouter();
  const local = useLocalSearchParams();
  const [userId, setUserId] = useState("");
  const [profiles, setProfiles] = useState([]);

  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
        console.log(userId);
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
        Alert.alert("Error", "Failed to load user ID");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://${process.env.EXPO_PUBLIC_IP}:8081/profile/${local.profileID}`
        );
        setProfiles(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to fetch profile");
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (profiles) {
      setPrivacy(profiles.private ? true : false);
      setMarketing(profiles.want_marketing ? true : false);
    }
  }, [profiles]);

  useEffect(() => {
    var date = "";
    var post = "";
    var phone = "";

    if (profiles) {
        console.log(profiles.first_name);
      if (profiles.dob) {
        let currDate = new Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(profiles.dob));

        let [day, month, year] = currDate.split("/");
        date += year;
        date += "-";
        date += month;
        date += "-";
        date += day;
      }
      if (profiles.phone_number) {
        phone += profiles.phone_number;
      }
      if (profiles.postcode) {
        post += profiles.postcode;
      }
      reset({
        first_name: profiles.first_name || "",
        last_name: profiles.last_name || "",
        email: profiles.email || "",
        phone_number: phone,
        address: profiles.address || "",
        postcode: post,
        interests: profiles.interests || "",
        dob: date,
        pronouns: profiles.pronouns || "",
        private: !!profiles.private,
        want_marketing: !!profiles.want_marketing,
      });
    }
  }, [profiles]);

  const onSubmit = async (data) => {
    //Use the generated registration information to insert into the database
    for (var key in data) {
      if (data[key] == "") {
        data[key] = null;
      }
    }

    const payload = {
      ...data,
      userId,
      privacy,
      marketing,
    };
    try {
      const editProfileResponse = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP}:8081/profile/edit`,
        payload
      );
      console.log("Server Response:", editProfileResponse.data);
      Alert.alert("Success", "Update successful");
      router.push({
        pathname: "/profile",
      });
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", error.response?.data?.message || "Update failed");
    }
  };
  return (
    <View style={styles.background}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Editing the Profile of: {profiles.first_name} {profiles.last_name}
        </Text>
      </View>
      <ScrollView>
        <FormContainer>
          <View style={styles.inputs}>
            {[
              {
                field: "first_name",
                placeholder: "First Name",
                label: "Full Name",
                autocomplete: "given-name",
                lines: 1,
                multiline: false,
                rule: { required: "You must enter your first name" },
              },
              {
                field: "last_name",
                placeholder: "Last Name",
                autocomplete: "family-name",
                lines: 1,
                multiline: false,
                rule: { required: "You must enter your last name" },
              },
              {
                field: "email",
                placeholder: "Email Address",
                label: "Contact Info",
                autocomplete: "email",
                lines: 1,
                multiline: false,
                rule: {
                  required: "You must enter your email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                },
              },
              {
                field: "phone_number",
                placeholder: "Phone Number",
                autocomplete: "tel",
                lines: 1,
                multiline: false,
                rule: {
                  maxLength: {
                    value: 20,
                    message: "Enter a valid Phone Number",
                  },
                  pattern: {
                    value: /[\d\s]{10,20}$/,
                    message: "Enter a valid phone number",
                  },
                },
              },
              {
                field: "address",
                placeholder: "Address",
                label: "Address",
                autocomplete: "address-line1",
                lines: 1,
                multiline: false,
              },
              {
                field: "postcode",
                placeholder: "Postcode",
                autocomplete: "postal-code",
                lines: 1,
                multiline: false,
                rule: {
                  maxLength: { value: 4, message: "Enter a valid postcode" },
                  pattern: {
                    value: /\d{4}$/,
                    message: "Enter a valid postcode",
                  },
                },
              },
              {
                field: "interests",
                placeholder: "What Interests You?",
                label: "Interests",
                autocomplete: "off",
                lines: 4,
                multiline: true,
              },
              {
                field: "dob",
                placeholder: "YYYY-MM-DD",
                label: "Date of Birth",
                autocomplete: "off",
                lines: 1,
                multiline: false,
                rule: {
                  maxLength: { value: 10, message: "Enter a valid date" },
                  pattern: {
                    value: /\d{4}-\d{2}-\d{2}/,
                    message: "Enter a valid date (YYYY-MM-DD)",
                  },
                },
              },
              {
                field: "pronouns",
                placeholder: "Pronouns",
                label: "Pronouns",
                autocomplete: "off",
                lines: 1,
                multiline: false,
                rule: {
                  pattern: {
                    value: /[^/s]+\/[^/s]+/,
                    message: "Invalid Pronouns '*/*'",
                  },
                },
              },
            ].map(
              ({
                field,
                placeholder,
                label,
                lines,
                multiline,
                autocomplete,
                rule,
              }) => (
                <View key={field} style={styles.inputs}>
                  {label && <FormLabel>{label}</FormLabel>}
                  <Controller
                    key={field}
                    control={control}
                    name={field}
                    render={({ field: { onChange, value } }) => (
                      <FormInput
                        autoComplete={autocomplete}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        multiline={multiline}
                        lines={lines}
                      />
                    )}
                    rules={rule}
                  />
                  {errors[field] && isSubmitted && (
                    <Text style={styles.errorText}>{errors[field].message?.toString()}</Text>
                  )}
                </View>
              )
            )}
          </View>

          <View style={styles.function}>
            <Button onPress={handleSubmit(onSubmit)}>Submit Changes</Button>

            <Button
              onPress={() =>
                router.push({
                  pathname: "/profile",
                })
              }
            >
              Cancel Changes
            </Button>
          </View>
        </FormContainer>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    padding: 20,
    alignItems: "flex-start",
  },
  title: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#8A7D6A",
  },
  checkbox: {
    marginTop: 15,
    marginHorizontal: 5,
    alignSelf: "center",
  },
  titleText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
