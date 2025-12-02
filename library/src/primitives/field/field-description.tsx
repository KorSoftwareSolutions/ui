import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useField } from "./context";

export interface FieldDescriptionProps {
  children: string;

  render?: (props: FieldDescriptionProps) => React.ReactNode;

  style?: StyleProp<TextStyle>;
}

export function FieldDescription(props: FieldDescriptionProps) {
  const field = useField();
  const Component = props.render ?? Text;
  return <Component {...props} style={[field.styles?.description, props.style]} />;
}
