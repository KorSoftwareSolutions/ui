import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useTabsContext } from "./tabs-context";

export interface TabsPrimitiveListProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function TabsList(props: TabsPrimitiveListProps) {
  const { children, style, ...viewProps } = props;
  const { styles } = useTabsContext();

  const calculatedStyle = [styles?.list, style];

  return (
    <View {...viewProps} style={calculatedStyle}>
      {children}
    </View>
  );
}
