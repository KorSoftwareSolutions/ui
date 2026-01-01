import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useEmpty } from "./context";

export interface EmptyTitleProps {
  children: string;
  render?: (props: EmptyTitleProps) => React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function EmptyTitle(props: EmptyTitleProps) {
  const empty = useEmpty();
  const composedStyles = [empty.styles?.title, props.style];
  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyles} />;
}
