import React, { useState } from "react";
import { type LayoutRectangle, type StyleProp, View, type ViewStyle } from "react-native";
import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition } from "../../../hooks";
import { useComponentConfig } from "../../../themes/provider";
import { calculateComposedStyles, mergeStyles } from "../../../utils/calculate-styles";
import { SelectContext } from "../context";
import type { SelectOption, SelectState } from "../types";
import { SelectVariants } from "../variants";

interface SelectRootInjectedProps {
  style?: StyleProp<ViewStyle>;
}

export interface SelectRootBaseProps {
  variant?: keyof typeof SelectVariants;

  value?: string;
  onChange?: (value: string) => void;

  isDisabled?: boolean;
}

export interface SelectRootProps extends SelectRootBaseProps {
  children?: React.ReactNode;

  render?: (props: SelectRootInjectedProps) => React.ReactElement;

  style?: StyleProp<ViewStyle>;
}

const calculateState = (props: SelectRootProps): SelectState => {
  if (props.isDisabled) {
    return "disabled";
  }
  return "default";
};

export function SelectRoot(props: SelectRootProps) {
  const variantStyles = SelectVariants[props.variant ?? "default"]();
  const componentConfig = useComponentConfig("select");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const [options, setOptions] = useState<Array<SelectOption>>([]);

  const state = calculateState(props);
  const composedStyles = calculateComposedStyles(mergedStyles, state, "root", props.style);

  const Component = props.render ?? View;
  return (
    <SelectContext.Provider
      value={{
        value: props.value,
        onChange: props.onChange,
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
        styles: mergedStyles,
      }}
    >
      <Component style={composedStyles}>{props.children}</Component>
    </SelectContext.Provider>
  );
}
