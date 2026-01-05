import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useAlertDialog } from "./context";

export interface AlertDialogPrimitiveContentProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AlertDialogContent(props: AlertDialogPrimitiveContentProps) {
  const { children, style, ...viewProps } = props;
  const { styles } = useAlertDialog();

  const calculatedStyle = [styles?.content, style];

  return (
    <View {...viewProps} style={calculatedStyle}>
      {children}
    </View>
  );
}
