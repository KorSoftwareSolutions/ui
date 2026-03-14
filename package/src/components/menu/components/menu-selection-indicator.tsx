import React from "react";
import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import { useMenu } from "../context";

interface MenuSelectionIndicatorProps {
  isSelected: boolean;
}

export function MenuSelectionIndicator({ isSelected }: MenuSelectionIndicatorProps) {
  const config = useComponentConfig("menu");
  const menu = useMenu();
  const SelectionIcon = config?.selectionIcon;
  const indicatorStyles = menu.styles?.selectionIndicator;

  if (!isSelected) {
    return <View style={indicatorStyles as StyleProp<ViewStyle>} />;
  }

  if (SelectionIcon) {
    return <SelectionIcon {...indicatorStyles} />;
  }

  return <Text style={indicatorStyles}>✓</Text>;
}
