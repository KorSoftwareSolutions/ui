import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useMenu } from "../context";

export interface MenuSeparatorProps {
  render?: (props: MenuSeparatorProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function MenuSeparator(props: MenuSeparatorProps) {
  const menu = useMenu();
  const composedStyle = [menu.styles?.separator, props.style];

  const Component = props.render ?? View;
  return (
    <Component
      {...props}
      role="separator"
      style={composedStyle}
    />
  );
}
