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
        console.log(res.data);
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

    if (profiles.dob) {
      let currDate = new Date(profiles.dob).toLocaleDateString();

      date += currDate.slice(6, 10);
      date += "-";
      date += currDate.slice(3, 5);
      date += "-";
      date += currDate.slice(0, 2);
    }
    if (profiles) {
      reset({
        first_name: profiles.first_name || "",
        last_name: profiles.last_name || "",
        email: profiles.email || "",
        phone_number: profiles.phone_number || "",
        address: profiles.address || "",
        postcode: profiles.postcode || "",
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
    const payload = {
      ...data,
      userId,
      privacy,
      marketing,
    };
    console.log(payload);
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
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Editing the Profile of: {profiles.first_name} {profiles.last_name}
          </Text>
        </View>
        <View style={styles.editContainer}>
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
              rule: { required: "You must enter your phone number" },
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
                {label && <Text style={styles.label}>{label}</Text>}
                <Controller
                  key={name}
                  control={control}
                  name={name}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
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

          <View style={styles.function}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>Submit Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/profile",
                  query: { user_Id: userId },
                })
              }
            >
              <Text>Cancel Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  background: {
    backgroundColor: "#AFABA3",
    height: "100%",
  },
  title: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#8A7D6A",
  },
  information: {
    padding: 10,
    backgroundColor: "#f9f9f9", // optional
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
  },
  container: {
    padding: 20,
    alignItems: "flex-start",
  },
  logo: {
    width: 150,
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#FFD347",
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 10,
  },
  editContainer: {
    backgroundColor: "#F1F6F5",
    borderWidth: 2,
    borderColor: "#433D33",
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
  logoContainer: {
    backgroundColor: "#F1F6F5",
  },
  checkbox: {
    marginTop: 15,
    marginHorizontal: 5,
    alignSelf: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: "5%",
  },
  function: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 40,
    marginTop: 5,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#433D33",
  },
  whiteText: {
    color: "white",
  },
  titleText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});
