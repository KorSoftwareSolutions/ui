import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useButton } from "./button-context";

export interface ButtonLabelProps {
  children?: string;

  render?: (props: this) => React.ReactElement;

  style?: StyleProp<TextStyle>;
}

export function ButtonLabel(props: ButtonLabelProps) {
  const button = useButton();
  const calculatedStyle = [button.styles?.label?.default, button.styles?.label?.[button.state], props.style];

  const Component = props.render ?? Text;
  return <Component style={calculatedStyle}>{props.children}</Component>;
}
