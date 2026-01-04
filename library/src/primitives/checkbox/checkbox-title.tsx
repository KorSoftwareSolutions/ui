import React from "react";
import { Text, type TextProps, type StyleProp, type TextStyle } from "react-native";
import { useCheckboxContext } from "./checkbox-context";

export interface CheckboxPrimitiveTitleProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function CheckboxTitle(props: CheckboxPrimitiveTitleProps) {
  const { children, style, ...textProps } = props;
  const { state, styles } = useCheckboxContext();

  const calculatedStyle = [styles?.title?.default, styles?.title?.[state], style];

  return (
    <Text {...textProps} style={calculatedStyle}>
      {children}
    </Text>
  );
}
