import React, { useState } from "react";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { useOrganizedChildren } from "../../../hooks/use-organized-children";
import { useSidebar } from "../context";
import type { SidebarMenuButtonState } from "../types";

export interface SidebarMenuItemProps extends Omit<PressableProps, "style"> {
  children?: React.ReactNode;

  /** Mark as active item */
  isActive?: boolean;

  /** Size variant */
  size?: "default" | "lg";

  style?: StyleProp<ViewStyle>;
}

export function SidebarMenuItem(props: SidebarMenuItemProps) {
  const { children, isActive, size = "default", style, onPress, ...rest } = props;
  const sidebar = useSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const styles = sidebar.styles;

  const state: SidebarMenuButtonState = isActive ? "active" : isHovered ? "hovered" : "default";

  const textStyle = StyleSheet.flatten([
    styles?.menuItemText?.default,
    styles?.menuItemText?.[state],
  ]);

  const iconProps = StyleSheet.flatten([
    styles?.menuItemIcon?.default,
    styles?.menuItemIcon?.[state],
  ]);

  const organizedChildren = useOrganizedChildren(children, textStyle, iconProps);

  return (
    <Pressable
      {...rest}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles?.menuItem?.default,
        state !== "default" && styles?.menuItem?.[state],
        size === "lg" && { minHeight: 48, paddingVertical: 8 },
        style,
      ]}
    >
      {organizedChildren}
    </Pressable>
  );
}
