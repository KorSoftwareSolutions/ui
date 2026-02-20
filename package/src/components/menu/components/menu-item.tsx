import React, { useState } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { useOrganizedChildren } from "../../../hooks/use-organized-children";
import { useMenu } from "../context";
import type { MenuButtonState } from "../types";

export interface MenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;

  render?: (props: MenuItemProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
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
  const composedStyle = [
    menu.styles?.item?.default,
    menu.styles?.item?.[state],
    props.style,
  ];

  const handlePress = () => {
    props.onPress?.();
    menu.setIsOpen((prev) => !prev);
  };

  const textStyles = menu.styles?.itemText;
  const iconStyles = menu.styles?.itemIcon;

  const organizedChildren = useOrganizedChildren(
    props.children,
    textStyles,
    iconStyles,
  );

  if (props.render) {
    return (
      <>
        {props.render({
          ...props,
          children: organizedChildren,
        })}
      </>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={composedStyle}
    >
      {organizedChildren}
    </Pressable>
  );
}
