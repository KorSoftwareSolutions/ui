import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Portal } from "../portal";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { SelectContext, useSelect } from "./context";

export interface SelectContentProps {
  children?: React.ReactNode;

  render?: (props: SelectContentProps) => React.ReactElement;

  style?: StyleProp<ViewStyle>;
}

export function SelectContent(props: SelectContentProps) {
  const select = useSelect();
  const composedStyles = select.styles ? calculateComposedStyles(select.styles, select.state, "content", props.style) : props.style;

  const Component = props.render ?? View;
  if (!select.isOpen) {
    return null;
  }
  return (
    <Portal name="select-content">
      <SelectContext.Provider value={select}>
        <Component style={composedStyles}>{props.children}</Component>
      </SelectContext.Provider>
    </Portal>
  );
}
