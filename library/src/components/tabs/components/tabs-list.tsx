import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useTabsContext } from "../context";

export interface TabsListProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function TabsList(props: TabsListProps) {
  const { children, style, ...viewProps } = props;
  const { styles } = useTabsContext();

  const calculatedStyle = [styles?.list, style];

  return (
    <View {...viewProps} style={calculatedStyle}>
      {children}
    </View>
  );
}
