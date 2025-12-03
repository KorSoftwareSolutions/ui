import React from "react";
import { useEmpty } from "./context";
import { StyleProp, Text, TextStyle } from "react-native";

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
