import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { useRadioGroupContext } from "../context";
import { useRadioGroupItemContext } from "./radio-group-item";

export interface RadioGroupDescriptionProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function RadioGroupDescription(props: RadioGroupDescriptionProps) {
  const { children, style, ...textProps } = props;
  const { styles } = useRadioGroupContext();
  const { state } = useRadioGroupItemContext();

  const composedStyle = [styles?.description?.default, styles?.description?.[state], style];

  return (
    <Text {...textProps} style={composedStyle}>
      {children}
    </Text>
  );
}
