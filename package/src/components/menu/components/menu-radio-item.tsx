import React, { useState } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { useOrganizedChildren } from "../../../hooks/use-organized-children";
import { useMenu, useMenuRadioGroup } from "../context";
import type { MenuRadioItemState } from "../types";
import { MenuSelectionIndicator } from "./menu-selection-indicator";

export interface MenuRadioItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  closeOnPress?: boolean;
  render?: (props: MenuRadioItemProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (
  isHovered: boolean,
  isSelected: boolean,
  disabled?: boolean,
): MenuRadioItemState => {
  if (disabled) return "disabled";
  if (isSelected) return "selected";
  if (isHovered) return "hovered";
  return "default";
};

export function MenuRadioItem(props: MenuRadioItemProps) {
  const menu = useMenu();
  const radioGroup = useMenuRadioGroup();
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = radioGroup.value === props.value;
  const state = calculateState(isHovered, isSelected, props.disabled);

  const composedStyle = [
    menu.styles?.radioItem?.default,
    menu.styles?.radioItem?.[state],
    props.style,
  ];

  const handlePress = () => {
    if (props.disabled) return;
    radioGroup.onValueChange(props.value);
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
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled: props.disabled }}
      style={composedStyle}
    >
      {organizedChildren}
      <MenuSelectionIndicator isSelected={isSelected} />
    </Pressable>
  );
}
