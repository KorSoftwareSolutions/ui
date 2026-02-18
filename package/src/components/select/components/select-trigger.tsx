import React, { useRef } from "react";
import {
  Pressable,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import type { ViewRef } from "../../../types/element.types";
import { calculateComposedStyles } from "../../../utils/calculate-styles";
import { measureLayoutPosition } from "../../../utils/normalize-layout";
import { useSelect } from "../context";

export interface SelectTriggerProps {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export function SelectTrigger(props: SelectTriggerProps) {
  const select = useSelect();
  const triggerRef = useRef<ViewRef>(null);

  const composedStyles = calculateComposedStyles(
    select.styles,
    select.state,
    "trigger",
    props.style,
  );

  const onTriggerPress = () => {
    if (!select.isOpen) {
      measureLayoutPosition(triggerRef.current, (layout) => {
        select.setTriggerPosition(layout);
        select.setIsOpen(true);
      });
    } else {
      select.setIsOpen(false);
    }
  };

  return (
    <Pressable
      ref={triggerRef}
      onPress={onTriggerPress}
      disabled={select.isDisabled}
      style={composedStyles}
    >
      <SelectValue placeholder={props.placeholder} />
    </Pressable>
  );
}

export interface SelectValueProps {
  placeholder?: string;
  style?: StyleProp<TextStyle>;
}

export function SelectValue(props: SelectValueProps) {
  const select = useSelect();

  const selectedOption = select.options.find(
    (option) => option.value === select.value,
  );
  const selectedOptionLabel = selectedOption?.label;
  const displayValue = selectedOptionLabel ?? select.value;

  const composedStyles = calculateComposedStyles(
    select.styles,
    select.state,
    displayValue ? "value" : "placeholder",
  );
  if (!!displayValue && typeof displayValue !== "string") {
    return <>{displayValue}</>;
  }
  return (
    <Text style={composedStyles}>{displayValue ?? props.placeholder}</Text>
  );
}
