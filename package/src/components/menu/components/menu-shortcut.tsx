import React from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";
import { useMenu } from "../context";

export interface MenuShortcutProps {
  children: string;
  render?: (props: MenuShortcutProps) => React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function MenuShortcut(props: MenuShortcutProps) {
  const menu = useMenu();
  const composedStyle = [menu.styles?.shortcut, props.style];

  const Component = props.render ?? Text;
  return (
    <Component {...props} style={composedStyle}>
      {props.children}
    </Component>
  );
}
