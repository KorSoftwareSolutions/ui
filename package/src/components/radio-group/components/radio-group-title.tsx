import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { useRadioGroupContext } from "../context";
import { useRadioGroupItemContext } from "./radio-group-item";

export interface RadioGroupTitleProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function RadioGroupTitle(props: RadioGroupTitleProps) {
  const { children, style, ...textProps } = props;
  const { styles } = useRadioGroupContext();
  const { state } = useRadioGroupItemContext();

  const composedStyle = [styles?.title?.default, styles?.title?.[state], style];

  return (
    <Text {...textProps} style={composedStyle}>
      {children}
    </Text>
  );
}
