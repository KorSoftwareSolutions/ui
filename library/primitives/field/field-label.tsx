import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface FieldLabelProps {
  style?: StyleProp<TextStyle>;
  render?: (props: FieldLabelProps) => React.ReactNode;
}

export function FieldLabel(props: FieldLabelProps) {
  return props.render ? props.render(props) : null;
}
