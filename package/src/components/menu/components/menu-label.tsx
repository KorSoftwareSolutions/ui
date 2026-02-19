import React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";
import { useMenu } from "../context";

export interface MenuLabelProps {
  children: string;
  render?: (props: MenuLabelProps) => React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function MenuLabel(props: MenuLabelProps) {
  const menu = useMenu();
  const composedStyle = [menu.styles?.label, props.style];

  const Component = props.render ?? Text;
  return (
    <Component {...props} style={composedStyle}>
      {props.children}
    </Component>
  );
}
