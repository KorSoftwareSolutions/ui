import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useField } from "./context";

export interface FieldErrorProps {
  children: string;

  render?: (props: FieldErrorProps) => React.ReactNode;

  style?: StyleProp<TextStyle>;
}

export function FieldError(props: FieldErrorProps) {
  const field = useField();
  const Component = props.render ?? Text;
  return <Component {...props} style={[field.styles?.error, props.style]} />;
}
