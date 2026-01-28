import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { useAlertDialog } from "../context";

export interface AlertDialogTitleProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function AlertDialogTitle(props: AlertDialogTitleProps) {
  const { children, style, ...textProps } = props;
  const { styles } = useAlertDialog();

  const calculatedStyle = [styles?.title, style];

  return (
    <Text {...textProps} style={calculatedStyle}>
      {children}
    </Text>
  );
}
