import React, { useState } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { CheckboxContext } from "../context";
import type { CheckboxState } from "../types";
import { CheckboxVariants } from "../variants";

export interface CheckboxRootProps extends Omit<PressableProps, "children"> {
  variant?: keyof typeof CheckboxVariants;
  children: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (value: boolean, isDisabled: boolean | undefined, isHovered: boolean): CheckboxState => {
  if (isDisabled) {
    return "disabled";
  }
  if (isHovered) {
    return "hovered";
  }
  if (value) {
    return "checked";
  }
  return "default";
};

export function CheckboxRoot(props: CheckboxRootProps) {
  const { children, value, onChange, isDisabled, style, ...pressableProps } = props;
  const variantStyles = CheckboxVariants[props.variant || "default"]();
  const [isHovered, setIsHovered] = useState(false);

  const state = calculateState(value, isDisabled, isHovered);
  const handlePress = () => {
    if (!isDisabled) {
      onChange(!value);
    }
  };

  const calculatedStyle = [variantStyles.root?.default, variantStyles.root?.[state], style];

  const contextValue = React.useMemo(
    () => ({
      value,
      isDisabled,
      state,
      styles: variantStyles,
    }),
    [value, isDisabled, state, variantStyles],
  );

  return (
    <CheckboxContext.Provider value={contextValue}>
      <Pressable
        {...pressableProps}
        disabled={isDisabled}
        onPress={handlePress}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={calculatedStyle}
      >
        {children}
      </Pressable>
    </CheckboxContext.Provider>
  );
}
