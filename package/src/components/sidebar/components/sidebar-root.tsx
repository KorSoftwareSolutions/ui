import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarRootProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SidebarRoot(props: SidebarRootProps) {
  const { children, style } = props;
  const { open, width = 256, styles } = useSidebar();

  return (
    <View style={[styles?.root, { width }, !open && { width: 0, overflow: "hidden" }, style]}>
      {children}
    </View>
  );
}
