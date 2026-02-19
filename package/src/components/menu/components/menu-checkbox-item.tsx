import React, { useState } from "react";
import { Pressable, Text, type StyleProp, type ViewStyle } from "react-native";
import { useMenu } from "../context";
import type { MenuCheckboxItemState } from "../types";
import { useOrganizedChildren } from "../use-organized-children";

export interface MenuCheckboxItemProps {
  children: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  closeOnPress?: boolean;
  render?: (props: MenuCheckboxItemProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (
  isHovered: boolean,
  disabled?: boolean,
): MenuCheckboxItemState => {
  if (disabled) return "disabled";
  if (isHovered) return "hovered";
  return "default";
};

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const menu = useMenu();
  const [isHovered, setIsHovered] = useState(false);
  const state = calculateState(isHovered, props.disabled);

  const composedStyle = [
    menu.styles?.checkboxItem?.default,
    menu.styles?.checkboxItem?.[state],
    props.style,
  ];

  const handlePress = () => {
    if (props.disabled) return;
    props.onCheckedChange(!props.checked);
    if (props.closeOnPress) {
      menu.setIsOpen(false);
    }
  };

  const organizedChildren = useOrganizedChildren(props.children);

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
      disabled={props.disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: props.checked, disabled: props.disabled }}
      style={composedStyle}
    >
      {organizedChildren}
      <Text style={menu.styles?.checkboxIndicator}>
        {props.checked ? "✓" : " "}
      </Text>
    </Pressable>
  );
}
