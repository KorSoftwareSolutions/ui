import React, { useMemo } from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { TabsPrimitiveContext } from "./tabs-context";
import type { TabsStyles } from "./types";

export interface TabsPrimitiveRootProps extends Omit<ViewProps, "children"> {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  styles?: TabsStyles;
}

export function TabsRoot(props: TabsPrimitiveRootProps) {
  const { children, value, onChange, styles, style, ...viewProps } = props;

  const contextValue = useMemo(
    () => ({
      value,
      onChange,
      styles,
    }),
    [value, onChange, styles]
  );

  return (
    <TabsPrimitiveContext.Provider value={contextValue}>
      <View {...viewProps} style={style}>
        {children}
      </View>
    </TabsPrimitiveContext.Provider>
  );
}
