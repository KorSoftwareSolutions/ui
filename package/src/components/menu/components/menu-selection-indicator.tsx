import React from "react";
import { Text, View } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import { useMenu } from "../context";

interface MenuSelectionIndicatorProps {
  isSelected: boolean;
}

export function MenuSelectionIndicator({ isSelected }: MenuSelectionIndicatorProps) {
  const config = useComponentConfig("menu");
  const menu = useMenu();
  const SelectionIcon = config?.selectionIcon;

  if (!isSelected) {
    return <View style={menu.styles?.selectionIndicator} />;
  }

  if (SelectionIcon) {
    return <SelectionIcon {...menu.styles?.selectionIndicator} />;
  }

  return <Text style={menu.styles?.selectionIndicator}>✓</Text>;
}
