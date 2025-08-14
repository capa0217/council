import React from "react";
import { Stack } from "expo-router";
import Header from "@/PTComponents/Header";

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown:false}}/>
  );
}
