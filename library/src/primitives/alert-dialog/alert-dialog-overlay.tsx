import React from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { useAlertDialog } from "./context";

export interface AlertDialogPrimitiveOverlayProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

export function AlertDialogOverlay(props: AlertDialogPrimitiveOverlayProps) {
  const { style, ...pressableProps } = props;
  const { styles, setIsOpen } = useAlertDialog();

  const calculatedStyle = [styles?.overlay, style];

  return (
    <Pressable
      {...pressableProps}
      style={calculatedStyle}
      onPress={() => setIsOpen(false)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Close alert dialog"
    />
  );
}
