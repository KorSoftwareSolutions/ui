import React, { useMemo } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { MenuRadioGroupContext, useMenu } from "../context";

export interface MenuRadioGroupProps {
  children?: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function MenuRadioGroup(props: MenuRadioGroupProps) {
  const menu = useMenu();
  const composedStyle = [menu.styles?.radioGroup, props.style];

  const contextValue = useMemo(
    () => ({
      value: props.value,
      onValueChange: props.onValueChange,
    }),
    [props.value, props.onValueChange],
  );

  return (
    <MenuRadioGroupContext.Provider value={contextValue}>
      <View
        accessibilityRole="radiogroup"
        role="radiogroup"
        style={composedStyle}
      >
        {props.children}
      </View>
    </MenuRadioGroupContext.Provider>
  );
}
