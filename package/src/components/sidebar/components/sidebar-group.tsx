import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarGroupProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SidebarGroup(props: SidebarGroupProps) {
  const { children, style } = props;
  const sidebar = useSidebar();

  return <View style={[sidebar.styles?.group, style]}>{children}</View>;
}
