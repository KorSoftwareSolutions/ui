import React from "react";
import { useField } from "./context";
import { Text, TextProps } from "react-native";

export interface FieldLabelProps {
  children: string;
  style?: TextProps["style"];
  render?: (props: FieldLabelProps) => React.ReactNode;
}

export function FieldLabel(props: FieldLabelProps) {
  const field = useField();
  const calculatedStyle = [field.styles?.label?.default, field.styles?.label?.[field.state], props.style];

  return props.render ? props.render(props) : <Text style={calculatedStyle}>{props.children}</Text>;
}
