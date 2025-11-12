import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface ButtonLabelProps {
  children?: string;

  render?: (props: this) => React.ReactElement;

  style?: StyleProp<TextStyle>;
}

export function ButtonLabel(props: ButtonLabelProps) {
  const Component = props.render ?? Text;
  return <Component style={props.style}>{props.children}</Component>;
}
