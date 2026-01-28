import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { useCheckboxContext } from "../context";

export interface CheckboxTitleProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function CheckboxTitle(props: CheckboxTitleProps) {
  const { children, style, ...textProps } = props;
  const { state, styles } = useCheckboxContext();

  const calculatedStyle = [styles?.title?.default, styles?.title?.[state], style];

  return (
    <Text {...textProps} style={calculatedStyle}>
      {children}
    </Text>
  );
}
