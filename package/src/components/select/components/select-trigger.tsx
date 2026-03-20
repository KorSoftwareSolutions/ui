import React, { useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle
} from "react-native";
import type { ViewRef } from "../../../types/element.types";
import { extractPressableStyles } from "../../../utils/calculate-styles";
import { measureLayoutPosition } from "../../../utils/normalize-layout";
import { useSelect } from "../context";

export interface SelectTriggerProps {
  placeholder?: string;
  style?: PressableProps["style"];
}

export function SelectTrigger(props: SelectTriggerProps) {
  const select = useSelect();
  const triggerRef = useRef<ViewRef>(null);

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
      style={(styleProp) =>
        StyleSheet.flatten([
          extractPressableStyles(select.styles?.trigger?.default, styleProp),
          extractPressableStyles(select.styles?.trigger?.[select.state], styleProp),
          extractPressableStyles(props.style, styleProp),
        ])
      }
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

  const selectedOption = select.options.find((option) => option.value === select.value);
  const selectedOptionLabel = selectedOption?.label;
  const displayValue = selectedOptionLabel ?? select.value;

  const key = displayValue ? "value" : "placeholder";
  const slotStyles = select.styles?.[key];
  const composedStyles: StyleProp<TextStyle> = [slotStyles?.default, slotStyles?.[select.state]];

  if (!!displayValue && typeof displayValue !== "string") {
    return <>{displayValue}</>;
  }
  return <Text style={composedStyles}>{displayValue ?? props.placeholder}</Text>;
}
