import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { RadioGroupContext } from "../context";
import type { RadioGroupState } from "../types";
import { RadioGroupVariants } from "../variants";

export interface RadioGroupRootProps extends Omit<ViewProps, "children"> {
  variant?: keyof typeof RadioGroupVariants;
  children: React.ReactNode;
  value?: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (isDisabled: boolean | undefined): RadioGroupState => {
  if (isDisabled) return "disabled";
  return "default";
};

export function RadioGroupRoot(props: RadioGroupRootProps) {
  const { children, value, onChange, isDisabled, style, variant, ...viewProps } = props;
  const variantStyles = RadioGroupVariants[variant ?? "default"]();

  const state = calculateState(isDisabled);
  const composedStyle = [variantStyles.root?.default, variantStyles.root?.[state], style];

  const contextValue = React.useMemo(
    () => ({
      value,
      onChange,
      isDisabled,
      state,
      styles: variantStyles,
    }),
    [value, onChange, isDisabled, state, variantStyles],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View {...viewProps} style={composedStyle}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}
