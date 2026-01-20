import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useEmpty } from "./context";

export interface EmptyDescriptionProps {
  children: string;
  render?: (props: EmptyDescriptionProps) => React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function EmptyDescription(props: EmptyDescriptionProps) {
  const empty = useEmpty();
  const composedStyles = [empty.styles?.description, props.style];

  return <Text {...props} style={composedStyles} />;
}
