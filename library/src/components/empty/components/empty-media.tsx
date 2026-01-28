import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useEmpty } from "../context";

export interface EmptyMediaProps {
  children: React.ReactNode;
  render?: (props: EmptyMediaProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function EmptyMedia(props: EmptyMediaProps) {
  const empty = useEmpty();
  const composedStyles = [empty.styles?.media, props.style];
  const Component = props.render ?? View;
  return <Component {...props} style={composedStyles} />;
}
