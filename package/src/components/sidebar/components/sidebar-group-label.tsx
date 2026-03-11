import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarGroupLabelProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function SidebarGroupLabel(props: SidebarGroupLabelProps) {
  const { children, style } = props;
  const sidebar = useSidebar();

  return <Text style={[sidebar.styles?.groupLabel, style]}>{children}</Text>;
}
