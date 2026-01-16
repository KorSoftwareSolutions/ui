import type { ViewRef } from "@/types/element.types";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import { measureLayoutPosition } from "@/utils/normalize-layout";
import React, { useRef } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { useSelect } from "./context";

export interface SelectTriggerProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function SelectTrigger(props: SelectTriggerProps) {
  const select = useSelect();
  const triggerRef = useRef<ViewRef>(null);

  const composedStyles = calculateComposedStyles(select.styles, select.state, "trigger", props.style);

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
    <Pressable ref={triggerRef} onPress={onTriggerPress} disabled={select.isDisabled} style={composedStyles}>
      {props.children}
    </Pressable>
  );
}
