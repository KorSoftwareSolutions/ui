import type { TextChildren } from "@/types/element.types";
import type { PropsWithRender } from "@/types/props.types";
import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useAlert } from "./context";

export interface AlertDescriptionProps {
  children?: TextChildren;

  style?: StyleProp<TextStyle>;
}

export function AlertDescription(props: PropsWithRender<AlertDescriptionProps>) {
  const alert = useAlert();

  const composedStyle = [alert.styles?.description, props.style];

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
