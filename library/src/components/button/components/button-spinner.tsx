import React from "react";
import { ActivityIndicator, type ActivityIndicatorProps, type StyleProp, type ViewStyle } from "react-native";
import { useButton } from "../context";

export interface ButtonSpinnerProps {
  style?: StyleProp<ViewStyle>;
  color?: ActivityIndicatorProps["color"];
}

export function ButtonSpinner(props: ButtonSpinnerProps) {
  const button = useButton();
  const composedStyle = [button.styles?.spinner?.default?.style, button.styles?.spinner?.[button.state]?.style, props.style];
  return <ActivityIndicator style={composedStyle} color={props.color} />;
}
