import React, { useMemo } from "react";
import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
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
  const componentConfig = useComponentConfig("tabs");

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const contextValue = useMemo(
    () => ({
      value,
      onChange,
      styles: mergedStyles,
    }),
    [value, onChange, mergedStyles],
  );
  const composedStyles = StyleSheet.flatten([mergedStyles?.root, style]);

  return (
    <TabsContext.Provider value={contextValue}>
      <View {...viewProps} style={composedStyles}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}
