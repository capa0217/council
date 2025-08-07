import { useEffect, useState } from "react";
import axios from "axios";

import {
  Text,
  TextInput,
  View,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import PTHeader from "./components/PTHeader";
import FormContainer from "./components/FormContainer";
import FormLabel from "./components/FormLabel.js";
import FormInput from "./components/FormInput.js";
import Button from "./components/Button.js";

import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";

const EditProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
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
    },
  });

  const router = useRouter();
  const [userId, setUserId] = useState(null);
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
          `http://${process.env.EXPO_PUBLIC_IP}:8081/profile/${userId}`
        );
        setProfiles(res.data);
      } catch (error) {
        console.error("Error fetching userId from storage:", error);
        Alert.alert("Error", "Failed to load user ID");
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
        query: { userId: userId },
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
      <PTHeader />
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
                name: "first_name",
                placeholder: "First Name",
                label: "Full Name",
                autocomplete: "given-name",
                lines: 1,
                multiline: false,
                rule: { required: "You must enter your first name" },
              },
              {
                name: "last_name",
                placeholder: "Last Name",
                autocomplete: "family-name",
                lines: 1,
                multiline: false,
                rule: { required: "You must enter your last name" },
              },
              {
                name: "email",
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
                name: "phone_number",
                placeholder: "Phone Number",
                autocomplete: "tel",
                lines: 1,
                multiline: false,
                rule: {
                  maxLength: {
                    value: 10,
                    message: "Enter a valid Phone Number",
                  },
                  pattern: {
                    value: /\d{10}$/,
                    message: "Enter a valid phone number",
                  },
                },
              },
              {
                name: "address",
                placeholder: "Address",
                label: "Address",
                autocomplete: "address-line1",
                lines: 1,
                multiline: false,
              },
              {
                name: "postcode",
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
                name: "interests",
                placeholder: "What Interests You?",
                label: "Interests",
                autocomplete: "off",
                lines: 4,
                multiline: true,
              },
              {
                name: "dob",
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
                name: "pronouns",
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
                name,
                placeholder,
                label,
                lines,
                multiline,
                autocomplete,
                defaultValue,
                rule,
              }) => (
                <View key={name} style={styles.inputGroup}>
                  {label && <FormLabel>{label}</FormLabel>}
                  <Controller
                    key={name}
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                      <FormInput
                        autoComplete={autocomplete}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        multiline={multiline}
                        lines={lines}
                        defaultValue={defaultValue}
                      />
                    )}
                    rules={rule}
                  />
                  {errors[name] && isSubmitted && (
                    <Text style={styles.errorText}>{errors[name].message}</Text>
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
                  query: { user_Id: userId },
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
