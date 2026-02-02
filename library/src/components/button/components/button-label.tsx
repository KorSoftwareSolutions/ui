import type { TextChildren } from "@/types/element.types";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useButton } from "../context";

export interface ButtonLabelProps {
  children?: TextChildren;

  style?: StyleProp<TextStyle>;
}

export function ButtonLabel(props: ButtonLabelProps) {
  const button = useButton();

  const calculatedStyle = calculateComposedStyles(button.styles, button.state, "label", props.style);

  const isSelectable = button.state !== "disabled" && button.state !== "loading";

  return (
    <Text selectable={isSelectable} style={calculatedStyle}>
      {props.children}
    </Text>
  );
}
