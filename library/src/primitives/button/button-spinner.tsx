import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { useButtonPrimitive } from "./button-context";
import { calculateComposedStyles } from "@/utils/calculate-styles";

interface ButtonSpinnerProps {
  style?: StyleProp<ViewStyle>;
}

export function ButtonSpinner(props: ButtonSpinnerProps) {
  const button = useButtonPrimitive();
  const composedStyle = calculateComposedStyles(button.styles, button.state, "spinner", props.style);
  return <ActivityIndicator style={composedStyle} />;
}
