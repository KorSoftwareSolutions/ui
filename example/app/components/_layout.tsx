import { Stack } from "expo-router";
import React from "react";

export default function ComponentsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
