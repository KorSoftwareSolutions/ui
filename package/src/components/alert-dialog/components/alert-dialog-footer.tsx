import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useAlertDialog } from "../context";

export interface AlertDialogFooterProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AlertDialogFooter(props: AlertDialogFooterProps) {
  const { children, style, ...viewProps } = props;
  const { styles } = useAlertDialog();

  const calculatedStyle = [styles?.footer, style];

  return (
    <View {...viewProps} style={calculatedStyle}>
      {children}
    </View>
  );
}
