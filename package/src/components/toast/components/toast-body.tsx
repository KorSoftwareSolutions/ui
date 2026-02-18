import type { PropsWithRender } from "../../../types/props.types";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useToast } from "../context";

export interface ToastBodyProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function ToastBody(props: PropsWithRender<ToastBodyProps>) {
  const toast = useToast();

  const composedStyle = [toast.styles?.body, props.style];

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
