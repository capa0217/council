import React, { useState } from "react";
import {
  Text,
  Image,
  TextInput,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PTHeader from "./components/PTHeader";

import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";

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
      console.log(process.env.EXPO_PUBLIC_IP);
      const response = await axios.post(
        `http://10.88.25.120:8081/users/login`,
        {
          website_login: data.website_login.trim(),
          password: data.password.trim(),
        }
      );
      console.log(response);
      const user= await axios.get( `http://10.88.25.120:8081/user/${response.data.user_id}`)
      console.log(user.data[0].user_id);
      const responses = await axios.get(
        `http://10.88.25.120:8081/clubAccess/${response.data.user_id}`,
      );
      console.log(responses.data);
      console.log(response.data[0]);
      if (response.status == 401) {
        Alert.alert("Login Failed", response.data.message);
      } else if (
        user.data[0].paid == "1" &&
        user.data[0].guest == "0" && responses.data.position == null
      ){
        // Store user data in AsyncStorage
        await AsyncStorage.setItem("userId", response.data.user_id.toString());
        router.push({
          pathname: "/club_meeting",
          query: { userId: response.data.user_id },
        });
        
      }else if( user.data[0].paid == "1" &&
        user.data[0].guest == "0" && responses.data.position != null){
          await AsyncStorage.setItem("userId", response.data.user_id.toString());
        router.push({
          pathname: "./BoardMember",
          query: { userId: response.data.user_id },
        });
        }
      else if(user.data[0].paid == "0" &&
        user.data[0].guest == "1" && responses.data.position == null|| (response.data[0].paid == "1" &&
        user.data[0].guest == "1" && responses.data.position == null)){
 await AsyncStorage.setItem("userId", response.data.user_id.toString());
        router.push({
          pathname: "./GuestPage",
          query: { userId: response.data.user_id },
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
      < View style={styles.containers}><View style={styles.logoContainer}>
                    <TouchableOpacity 
                    onPress={() =>
                          router.push({
                            pathname: `/`,
                          })
                        }>
                    <Image
                      source={{
                        uri: "https://www.powertalkaustralia.org.au/wp-content/uploads/2023/12/Asset-74x.png",
                      }}
                      style={styles.logos}
                      resizeMode="contain"
                    />
                    </TouchableOpacity>
                  </View></View>
      <View style={styles.loginContainer}>
        <View style={styles.add}><View style={styles.inputs}>
          {[
            {
              name: "website_login",
              placeholder: "Please enter your login",
              label: "Website-Login",
              autocomplete: "username",
              rule: { required: "You must enter your login" },
              secure:false,
              
            },
            {
              name: "password",
              placeholder: "Please Enter Your Password",
              label: "Password",
              autocomplete: "current-password",
              rule: { required: "You must enter your password" },
              secure:true,
            },
          ].map(({ name, placeholder, label, autocomplete, rule, secure }) => (
            <View key={name} style={styles.inputGroup}>
              {label && <Text style={styles.label}>{label}</Text>}
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
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
          ))}<TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleLogin)}
          >
            <Text>Login</Text>
          </TouchableOpacity></View>
         
        
        </View>
         <View style={styles.design}><Text style={styles.new}>You are new here?</Text><Image
        source={require('./OIP.webp')} // ✅ use relative path
        style={styles.image}
      />  
         <TouchableOpacity
            style={styles.butto}
            onPress={()=>router.push('./register')}
          >
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#dbd6cbff",
    height: "100%",
  },
  containers: {
    backgroundColor: "#F1F6F5",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logos:{
    
    width: 150,
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
  
  },
  logo: {
    width: 150,
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
  },
  butto:{
    backgroundColor: "#FFD347",
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 10, // Adds top and bottom spacing
    marginHorizontal: 15,
    left:40,
    top:30,
    position:'relative',
    zIndex:15,
    top:250,
    left:125
  },new:{
    position:'relative',
    zIndex:15,
    fontSize:50,
    color: 'blue',
    fontWeight:'100',
    left:5,
    top:150,
    fontStyle:'italic'
  },
  image:{
      width:399.2,
      height:496.8,
      zIndex:-15,
      position:'absolute'
  },
  add:{
     backgroundColor:'white',
     width:300,
     paddingTop:120,
  },
  design:{
   backgroundColor:'green',
   width:400,
  },
  button: {
    backgroundColor: "#FFD347",
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 10, // Adds top and bottom spacing
    marginHorizontal: 15,
    left:40,
    top:30,
  },
  input: {
    borderWidth: 2,
    borderColor: "#bc7319ff",
    width: "100%",
    height: 50,
    color:'black',
    marginTop: "1%",
    paddingLeft: 10,
   shadowOpacity:10,
   shadowColor:'orange',
   shadowRadius:10,
    
  },
  inputs: {
    marginHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  loginContainer: {
    backgroundColor: "#F1F6F5",
    borderWidth: 2,
    borderColor: "#433D33",
    marginTop: "5%",
    width:700,
    left:400,
    height:500,
    shadowOpacity:10,
   shadowColor:'white',
   shadowRadius:10,
    display:'flex',
    flexDirection:'row',
  },
  logoContainer: {
    backgroundColor: "#F1F6F5",
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