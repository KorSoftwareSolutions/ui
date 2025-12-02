import React, { useState } from "react";
import { LayoutRectangle, StyleProp, View, ViewStyle } from "react-native";
import { SelectContext } from "./context";
import { SelectOption, SelectState, SelectStyles } from "./types";
import { calculateComposedStyles } from "@/utils/calculate-styles";

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
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
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
        triggerLayout,
        setTriggerLayout,
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
