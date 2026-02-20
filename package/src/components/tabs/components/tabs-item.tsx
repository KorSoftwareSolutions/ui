import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTabsContext } from "../context";
import type { TabsItemState } from "../types";
import { useOrganizedChildren } from "../use-organized-children";

export interface TabsItemProps extends PressableProps {
  children: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (
  isActive: boolean,
  isDisabled: boolean,
  isHovered: boolean,
): TabsItemState => {
  if (isDisabled) {
    return "disabled";
  }
  if (isActive) {
    return "active";
  }
  if (isHovered) {
    return "hovered";
  }
  return "default";
};

export function TabsItem(props: TabsItemProps) {
  const {
    children,
    value: triggerValue,
    isDisabled = false,
    style,
    ...pressableProps
  } = props;
  const { value, onChange, styles } = useTabsContext();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = value === triggerValue;
  const state = calculateState(isActive, isDisabled, isHovered);

  const handlePress = () => {
    if (!isDisabled) {
      onChange(triggerValue);
    }
  };

  const calculatedStyle = StyleSheet.flatten([
    styles?.item?.default,
    styles?.item?.[state],
    style,
  ]);

  const textStyles = StyleSheet.flatten([
    styles?.itemText?.default,
    styles?.itemText?.[state],
  ]);

  const iconStyles = StyleSheet.flatten([
    styles?.itemIcon?.default,
    styles?.itemIcon?.[state],
  ]);

  const organizedChildren = useOrganizedChildren(
    children,
    textStyles,
    iconStyles ?? undefined,
  );

  return (
    <Pressable
      {...pressableProps}
      onHoverIn={(e) => {
        setIsHovered(true);
        pressableProps.onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        setIsHovered(false);
        pressableProps.onHoverOut?.(e);
      }}
      disabled={isDisabled}
      onPress={handlePress}
      style={calculatedStyle}
    >
      {organizedChildren}
    </Pressable>
  );
}
