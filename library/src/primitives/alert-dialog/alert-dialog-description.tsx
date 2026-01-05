import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { useAlertDialog } from "./context";

export interface AlertDialogPrimitiveDescriptionProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function AlertDialogDescription(props: AlertDialogPrimitiveDescriptionProps) {
  const { children, style, ...textProps } = props;
  const { styles } = useAlertDialog();

  const calculatedStyle = [styles?.description, style];

  return (
    <Text {...textProps} style={calculatedStyle}>
      {children}
    </Text>
  );
}
