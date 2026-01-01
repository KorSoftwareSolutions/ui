import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useDropdownMenu } from "./context";

export interface DropdownMenuDividerProps {
  render?: (props: DropdownMenuDividerProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function DropdownMenuDivider(props: DropdownMenuDividerProps) {
  const menu = useDropdownMenu();

  const composedStyle = [menu.styles?.divider, props.style];

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
