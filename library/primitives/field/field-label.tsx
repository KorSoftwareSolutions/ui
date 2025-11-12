import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface FieldLabelProps {
  children: string;
  style?: StyleProp<TextStyle>;
  render?: (props: FieldLabelProps) => React.ReactNode;
}

export function FieldLabel(props: FieldLabelProps) {
  return props.render ? props.render(props) : <Text style={props.style}>{props.children}</Text>;
}
