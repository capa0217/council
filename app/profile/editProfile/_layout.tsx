import React from "react";
import { Stack } from "expo-router";
export default function editProfileLayout() {
   return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[profileID]" />
      </Stack>
    );
}