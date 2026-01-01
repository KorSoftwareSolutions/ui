import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useToast } from "./context";

export interface ToastTitleProps {
  children?: string;

  render?: (props: ToastTitleProps) => React.ReactNode;

  style?: StyleProp<TextStyle>;
}

export function ToastTitle(props: ToastTitleProps) {
  const toast = useToast();

  const composedStyle = [toast.styles?.title, props.style];

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
