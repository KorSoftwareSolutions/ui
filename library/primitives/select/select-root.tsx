import React from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";

interface SelectRootProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;

  render?: (props: SelectRootProps) => React.ReactElement;
}

export function SelectRoot(props: SelectRootProps) {
  const Component = props.render ?? View;
  return <Component style={props.style}>{props.children}</Component>;
}
