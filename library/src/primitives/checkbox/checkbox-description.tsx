import React from "react";
import { Text, type TextProps, type StyleProp, type TextStyle } from "react-native";
import { useCheckboxContext } from "./checkbox-context";

export interface CheckboxPrimitiveDescriptionProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function CheckboxDescription(props: CheckboxPrimitiveDescriptionProps) {
  const { children, style, ...textProps } = props;
  const { state, styles } = useCheckboxContext();

  const calculatedStyle = [styles?.description?.default, styles?.description?.[state], style];

  return (
    <Text {...textProps} style={calculatedStyle}>
      {children}
    </Text>
  );
}
