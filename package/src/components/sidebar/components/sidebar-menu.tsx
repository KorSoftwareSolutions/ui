import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarMenuProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SidebarMenu(props: SidebarMenuProps) {
  const { children, style } = props;
  const sidebar = useSidebar();

  return <View style={[sidebar.styles?.menu, style]}>{children}</View>;
}
