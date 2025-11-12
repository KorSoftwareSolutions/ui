import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

interface ButtonRootProps {
  children?: React.ReactNode;

  onPress?: () => void;
  style?: StyleProp<ViewStyle>;

  render?: (props: this) => React.ReactElement;
}

export function ButtonRoot(props: ButtonRootProps) {
  const Container = props.render ?? Pressable;
  return <Container {...props} style={props.style} />;
}
