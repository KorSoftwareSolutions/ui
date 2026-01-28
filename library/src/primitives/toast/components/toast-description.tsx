import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useToast } from "../context";

export interface ToastDescriptionProps {
  children?: string;

  render?: (props: ToastDescriptionProps) => React.ReactNode;

  style?: StyleProp<TextStyle>;
}

export function ToastDescription(props: ToastDescriptionProps) {
  const toast = useToast();

  const composedStyle = [toast.styles?.description, props.style];

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
