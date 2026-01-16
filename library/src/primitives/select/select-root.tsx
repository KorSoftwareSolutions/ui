import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition } from "@/hooks";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import React, { useState } from "react";
import { type LayoutRectangle, type StyleProp, View, type ViewStyle } from "react-native";
import { SelectContext } from "./context";
import type { SelectOption, SelectState, SelectStyles } from "./types";

interface SelectRootInjectedProps {
  style?: StyleProp<ViewStyle>;
}

export interface SelectRootBaseProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;

  isDisabled?: boolean;
}

export interface SelectRootProps extends SelectRootBaseProps {
  children?: React.ReactNode;

  render?: (props: SelectRootInjectedProps) => React.ReactElement;

  styles?: SelectStyles;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (props: SelectRootProps): SelectState => {
  if (props.isDisabled) {
    return "disabled";
  }
  return "default";
};

export function SelectRoot(props: SelectRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  const state = calculateState(props);
  const composedStyles = calculateComposedStyles(props.styles, state, "root", props.style);

  const Component = props.render ?? View;
  return (
    <SelectContext.Provider
      value={{
        value: props.value,
        onChange: props.onChange,
        placeholder: props.placeholder,
        isOpen,
        setIsOpen,
        triggerPosition,
        setTriggerPosition,
        contentLayout,
        setContentLayout,
        options,
        setOptions,
        state,
        isDisabled: props.isDisabled ?? false,
        styles: props.styles ?? null,
      }}
    >
      <Component style={composedStyles}>{props.children}</Component>
    </SelectContext.Provider>
  );
}
