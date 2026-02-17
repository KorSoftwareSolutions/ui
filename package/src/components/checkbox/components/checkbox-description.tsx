import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { useCheckboxContext } from "../context";

export interface CheckboxDescriptionProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function CheckboxDescription(props: CheckboxDescriptionProps) {
  const { children, style, ...textProps } = props;
  const { state, styles } = useCheckboxContext();

  const calculatedStyle = [styles?.description?.default, styles?.description?.[state], style];

  return (
    <Text {...textProps} style={calculatedStyle}>
      {children}
    </Text>
  );
}
