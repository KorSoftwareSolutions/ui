import React from "react";
import { Pressable, View } from "react-native";

interface ButtonRootProps {
  children?: React.ReactNode;

  onPress?: () => void;

  render?: (props: this) => React.ReactElement;
}

export function ButtonRoot(props: ButtonRootProps) {
  const Container = props.render ?? Pressable;
  return <Container {...props} />;
}
