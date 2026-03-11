import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SidebarHeader(props: SidebarHeaderProps) {
  const { children, style } = props;
  const sidebar = useSidebar();

  return <View style={[sidebar.styles?.header, style]}>{children}</View>;
}
