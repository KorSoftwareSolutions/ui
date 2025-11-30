import React, { useState } from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { SelectContext } from "./context";
import { SelectState, SelectStyles } from "./types";
import { calculateComposedStyles } from "../../utils/calculate-styles";

export interface SelectRootProps {
  children?: React.ReactNode;

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

  const state = calculateState(props);
  const composedStyles = props.styles ? calculateComposedStyles(props.styles, state, "root", props.style) : props.style;

  const Component = props.render ?? View;
  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        state,
        disabled: props.disabled ?? false,
        styles: props.styles ?? null,
      }}
    >
      <Component style={composedStyles}>{props.children}</Component>
    </SelectContext.Provider>
  );
}
