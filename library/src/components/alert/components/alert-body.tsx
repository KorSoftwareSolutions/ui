import type { PropsWithRender } from "@/types/props.types";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useAlert } from "../context";

export interface AlertBodyProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function AlertBody(props: PropsWithRender<AlertBodyProps>) {
  const alert = useAlert();

  const composedStyle = [alert.styles?.body, props.style];

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
