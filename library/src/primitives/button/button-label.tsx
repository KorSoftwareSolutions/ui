import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useButtonPrimitive } from "./button-context";

export interface ButtonPrimitiveLabelProps {
  children?: string;

  style?: StyleProp<TextStyle>;
}

export function ButtonLabel(props: ButtonPrimitiveLabelProps) {
  const button = useButtonPrimitive();

  const calculatedStyle = calculateComposedStyles(button.styles, button.state, "label", props.style);

  const isSelectable = button.state !== "disabled" && button.state !== "loading";

  return (
    <Text selectable={isSelectable} style={calculatedStyle}>
      {props.children}
    </Text>
  );
}
