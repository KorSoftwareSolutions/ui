import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarFooterProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SidebarFooter(props: SidebarFooterProps) {
  const { children, style } = props;
  const sidebar = useSidebar();

  return <View style={[sidebar.styles?.footer, style]}>{children}</View>;
}
