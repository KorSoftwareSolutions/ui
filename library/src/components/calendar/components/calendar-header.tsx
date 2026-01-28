import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useCalendarContext } from "../context";

export interface CalendarHeaderProps extends ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function CalendarHeader(props: CalendarHeaderProps) {
  const { children, style, ...viewProps } = props;
  const { styles } = useCalendarContext();

  const headerStyle = [styles?.header, style];

  return (
    <View {...viewProps} style={headerStyle}>
      {children}
    </View>
  );
}
