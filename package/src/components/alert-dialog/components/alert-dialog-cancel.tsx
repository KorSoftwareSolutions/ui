import React from "react";
import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { useAlertDialog } from "../context";

export interface AlertDialogCancelProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AlertDialogCancel(props: AlertDialogCancelProps) {
  const { children, style, onPress, ...pressableProps } = props;
  const { styles, setIsOpen } = useAlertDialog();

  const handlePress: PressableProps["onPress"] = (event) => {
    onPress?.(event);
    setIsOpen(false);
  };

  const calculatedStyle = [styles?.cancel, style];
  const textStyle = styles?.cancelText;

  return (
    <Pressable {...pressableProps} style={calculatedStyle} onPress={handlePress}>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}
