import React from "react";
import { Redirect } from "expo-router";

export default function project() {
  return (
    <Redirect
      href={{
        pathname: "/projects",
      }}
    />
  );
}
