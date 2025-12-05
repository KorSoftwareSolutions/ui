import React, { useState } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useDropdownMenu } from "./context";
import { DropdownMenuButtonState } from "./types";

export interface DropdownMenuButtonProps {
  children?: string;
  onPress?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;

  render?: (props: DropdownMenuButtonProps) => React.ReactElement;

  style?: StyleProp<TextStyle>;
}

const calculateState = (isHovered: boolean): DropdownMenuButtonState => {
  if (isHovered) {
    return "hovered";
  }
  return "default";
};

export function DropdownMenuButton(props: DropdownMenuButtonProps) {
  const menu = useDropdownMenu();
  const [isHovered, setIsHovered] = useState(false);
  const state = calculateState(isHovered);
  const composedStyle = [menu.styles?.button?.default, menu.styles?.button?.[state], props.style];

  const handlePress = () => {
    props.onPress?.();
    menu.setIsOpen((prev) => !prev);
  };

  const Component = props.render ?? Text;
  return (
    <Component
      {...props}
      onPress={handlePress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={composedStyle}
    >
      {props.children}
    </Component>
  );
}
