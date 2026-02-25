import React, { useState } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { useRadioGroupContext } from "../context";
import type { RadioItemState } from "../types";

export interface RadioGroupItemProps extends Omit<PressableProps, "children"> {
  children: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (
  isSelected: boolean,
  isDisabled: boolean | undefined,
  isHovered: boolean,
): RadioItemState => {
  if (isDisabled) return "disabled";
  if (isSelected) return "selected";
  if (isHovered) return "hovered";
  return "default";
};

export function RadioGroupItem(props: RadioGroupItemProps) {
  const { children, value, isDisabled, style, ...pressableProps } = props;
  const group = useRadioGroupContext();
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = group.value === value;
  const itemDisabled = isDisabled ?? group.isDisabled;
  const state = calculateState(isSelected, itemDisabled, isHovered);

  const composedStyle = [
    group.styles?.item?.default,
    group.styles?.item?.[state],
    style,
  ];

  return (
    <RadioGroupItemContext.Provider value={{ value, state, isSelected }}>
      <Pressable
        {...pressableProps}
        disabled={itemDisabled}
        onPress={() => {
          if (!itemDisabled) {
            group.onChange(value);
          }
        }}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={composedStyle}
      >
        {children}
      </Pressable>
    </RadioGroupItemContext.Provider>
  );
}

export interface RadioGroupItemContextValue {
  value: string;
  state: RadioItemState;
  isSelected: boolean;
}

export const RadioGroupItemContext = React.createContext<RadioGroupItemContextValue | null>(null);

export const useRadioGroupItemContext = () => {
  const context = React.useContext(RadioGroupItemContext);
  if (!context) {
    throw new Error("RadioGroup item components must be used within RadioGroup.Item");
  }
  return context;
};
