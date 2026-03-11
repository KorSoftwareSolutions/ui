import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarMenuSubProps {
  children?: React.ReactNode;

  /** Whether the submenu is open (controlled) */
  open?: boolean;

  style?: StyleProp<ViewStyle>;
}

export function SidebarMenuSub(props: SidebarMenuSubProps) {
  const { children, open = true, style } = props;
  const sidebar = useSidebar();

  if (!open) {
    return null;
  }

  return <View style={[sidebar.styles?.menuSub, style]}>{children}</View>;
}
