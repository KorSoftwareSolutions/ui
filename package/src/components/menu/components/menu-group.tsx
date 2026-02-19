import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useMenu } from "../context";

export interface MenuGroupProps {
  children?: React.ReactNode;
  render?: (props: MenuGroupProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function MenuGroup(props: MenuGroupProps) {
  const menu = useMenu();
  const composedStyle = [menu.styles?.group, props.style];

  const Component = props.render ?? View;
  return (
    <Component
      {...props}
      role="group"
      style={composedStyle}
    >
      {props.children}
    </Component>
  );
}
