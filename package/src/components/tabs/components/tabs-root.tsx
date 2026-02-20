import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { TabsContext } from "../context";
import { TabsVariants } from "../variants";

export interface TabsRootProps extends Omit<ViewProps, "children"> {
  variant?: keyof typeof TabsVariants;
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function TabsRoot(props: TabsRootProps) {
  const { children, value, onChange, style, ...viewProps } = props;
  const variantStyles = TabsVariants[props.variant || "default"]();

  const contextValue = useMemo(
    () => ({
      value,
      onChange,
      styles: variantStyles,
    }),
    [value, onChange, variantStyles],
  );
  const composedStyles = StyleSheet.flatten([variantStyles?.root, style]);

  return (
    <TabsContext.Provider value={contextValue}>
      <View {...viewProps} style={composedStyles}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}
