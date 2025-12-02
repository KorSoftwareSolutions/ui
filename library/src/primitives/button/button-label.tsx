import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useButtonPrimitive } from "./button-context";
import { calculateComposedStyles } from "@/utils/calculate-styles";

export interface ButtonPrimitiveLabelProps {
  children?: string;

  render?: (props: this) => React.ReactElement;

  style?: StyleProp<TextStyle>;
}

export function ButtonLabel(props: ButtonPrimitiveLabelProps) {
  const button = useButtonPrimitive();

  const calculatedStyle = calculateComposedStyles(button.styles, button.state, "label", props.style);

  const Component = props.render ?? Text;
  return <Component style={calculatedStyle}>{props.children}</Component>;
}
