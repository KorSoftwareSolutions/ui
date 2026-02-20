import React, { useState } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { useOrganizedChildren } from "../../../hooks/use-organized-children";
import { useMenu } from "../context";
import type { MenuCheckboxItemState } from "../types";
import { MenuSelectionIndicator } from "./menu-selection-indicator";

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
      disabled={props.disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: props.checked, disabled: props.disabled }}
      style={composedStyle}
    >
      {organizedChildren}
      <MenuSelectionIndicator isSelected={props.checked} />
    </Pressable>
  );
}
