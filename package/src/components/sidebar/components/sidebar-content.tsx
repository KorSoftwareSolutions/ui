import React from "react";
import { ScrollView, type StyleProp, type ViewStyle } from "react-native";
import { useSidebar } from "../context";

export interface SidebarContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SidebarContent(props: SidebarContentProps) {
  const { children, style } = props;
  const sidebar = useSidebar();

  return (
    <ScrollView style={[sidebar.styles?.content, style]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
