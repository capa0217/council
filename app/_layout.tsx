import React from "react";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import * as useStatusBar from "expo-status-bar";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import PTHeader from "@/PTComponents/Header";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (Platform.OS == "android") {
    NavigationBar.setVisibilityAsync("hidden");
  }
  useStatusBar.setStatusBarHidden(false);
  useStatusBar.setStatusBarStyle("dark");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        header() {
          return <PTHeader enabled={true} />;
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header() {
            return <PTHeader enabled={false} />;
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        options={{
          header() {
            return <PTHeader enabled={false} />;
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          header() {
            return <PTHeader enabled={false} />;
          },
          presentation: "modal",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="profile"
        options={{
          header() {
            return <PTHeader enabled={false} />;
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="editProfile"
        options={{
          header() {
            return <PTHeader enabled={false} />;
          },
          presentation: "modal",
        }}
      ></Stack.Screen>
    </Stack>
  );
}
