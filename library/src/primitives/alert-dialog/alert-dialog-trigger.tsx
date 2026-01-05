import type { ViewRef } from "@/types/element.types";
import React from "react";
import { type PressableProps } from "react-native";
import { useAlertDialog } from "./context";

export interface AlertDialogPrimitiveTriggerProps extends PressableProps {
  children: React.ReactElement<React.RefAttributes<ViewRef> & PressableProps>;
}

export function AlertDialogTrigger(props: AlertDialogPrimitiveTriggerProps) {
  const { onPress } = props;
  const { isOpen, setIsOpen } = useAlertDialog();

  const handlePress: PressableProps["onPress"] = (event) => {
    onPress?.(event);
    setIsOpen(true);
  };

  return React.cloneElement(props.children, {
    onPress: handlePress,
    role: "button",
    accessible: true,
    accessibilityRole: "button",
    accessibilityState: { expanded: isOpen },
    ...props.children.props,
  });
}
