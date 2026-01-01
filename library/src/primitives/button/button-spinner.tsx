import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { ActivityIndicator, type StyleProp, type ViewStyle } from "react-native";
import { useButtonPrimitive } from "./button-context";

interface ButtonSpinnerProps {
  style?: StyleProp<ViewStyle>;
}

export function ButtonSpinner(props: ButtonSpinnerProps) {
  const button = useButtonPrimitive();
  const composedStyle = calculateComposedStyles(button.styles, button.state, "spinner", props.style);
  return <ActivityIndicator style={composedStyle} />;
}
