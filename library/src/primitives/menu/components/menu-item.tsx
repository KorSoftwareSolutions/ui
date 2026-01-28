import React, { useState } from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import { useMenu } from "../context";
import type { MenuButtonState } from "../types";

export interface MenuItemProps {
  children: string;
  onPress?: () => void;

  render?: (props: MenuItemProps) => React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const calculateState = (isHovered: boolean): MenuButtonState => {
  if (isHovered) {
    return "hovered";
  }
  return "default";
};

export function MenuItem(props: MenuItemProps) {
  const menu = useMenu();
  const [isHovered, setIsHovered] = useState(false);
  const state = calculateState(isHovered);
  const composedStyle = [menu.styles?.item?.default, menu.styles?.item?.[state], props.style];

  const handlePress = () => {
    props.onPress?.();
    menu.setIsOpen((prev) => !prev);
  };

  const Component = props.render ?? Text;
  return (
    <Component
      {...props}
      onPress={handlePress}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={composedStyle}
    >
      {props.children}
    </Component>
  );
}
