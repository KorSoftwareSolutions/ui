import React from "react";
import { Pressable, Text, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { useAlertDialog } from "../context";

export interface AlertDialogActionProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AlertDialogAction(props: AlertDialogActionProps) {
  const { children, style, onPress, ...pressableProps } = props;
  const { styles, setIsOpen } = useAlertDialog();

  const handlePress: PressableProps["onPress"] = (event) => {
    onPress?.(event);
    setIsOpen(false);
  };

  const calculatedStyle = [styles?.action, style];
  const textStyle = styles?.actionText;

  return (
    <Pressable {...pressableProps} style={calculatedStyle} onPress={handlePress}>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}
