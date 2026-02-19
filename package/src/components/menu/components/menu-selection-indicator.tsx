import React from "react";
import { Text, View } from "react-native";
import { useComponentsConfig } from "../../../themes";
import { useMenu } from "../context";

interface MenuSelectionIndicatorProps {
  isSelected: boolean;
}

export function MenuSelectionIndicator({
  isSelected,
}: MenuSelectionIndicatorProps) {
  const config = useComponentsConfig();
  const menu = useMenu();
  const SelectionIcon = config?.menu?.selectionIcon;

  if (!isSelected) {
    return <View style={menu.styles?.selectionIndicator} />;
  }

  if (SelectionIcon) {
    return <SelectionIcon {...menu.styles?.selectionIndicator} />;
  }

  return <Text style={menu.styles?.selectionIndicator}>✓</Text>;
}
