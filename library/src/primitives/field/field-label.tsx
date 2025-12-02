import React from "react";
import { useField } from "./context";
import { Text, TextProps } from "react-native";

export interface FieldLabelProps {
  children: string;

  htmlFor?: string;

  render?: (props: FieldLabelProps) => React.ReactNode;

  style?: TextProps["style"];
}

export function FieldLabel(props: FieldLabelProps) {
  const field = useField();

  const Component = props.render ?? Text;
  return <Component {...props} htmlFor={props.htmlFor} style={[field.styles?.label, props.style]} />;
}
