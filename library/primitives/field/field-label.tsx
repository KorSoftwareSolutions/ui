import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useField } from "./field-context";

export interface FieldLabelProps {
  children: string;
  style?: StyleProp<TextStyle>;
  render?: (props: FieldLabelProps) => React.ReactNode;
}

export function FieldLabel(props: FieldLabelProps) {
  const field = useField();
  const calculatedStyle = field.styles?.label ?? props.style;
  return props.render ? props.render(props) : <Text style={calculatedStyle}>{props.children}</Text>;
}
