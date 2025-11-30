import React, { useState } from "react";
import { LayoutRectangle, Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { SelectContext } from "./context";
import { SelectState, SelectStyles } from "./types";
import { calculateComposedStyles } from "../../utils/calculate-styles";

export interface SelectRootProps {
  children?: React.ReactNode;

  value?: string;
  onChange?: (value: string) => void;

  disabled?: boolean;

  render?: (props: SelectRootProps) => React.ReactElement;

  styles?: SelectStyles;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (props: SelectRootProps): SelectState => {
  if (props.disabled) {
    return "disabled";
  }
  return "default";
};

export function SelectRoot(props: SelectRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);

  const state = calculateState(props);
  const composedStyles = calculateComposedStyles(props.styles, state, "root", props.style);

  const Component = props.render ?? View;
  return (
    <SelectContext.Provider
      value={{
        value: props.value ?? null,
        onChange: props.onChange,
        isOpen,
        setIsOpen,
        triggerLayout,
        setTriggerLayout,
        state,
        disabled: props.disabled ?? false,
        styles: props.styles ?? null,
      }}
    >
      <Component style={composedStyles}>{props.children}</Component>
    </SelectContext.Provider>
  );
}
