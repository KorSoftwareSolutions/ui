import React from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { formatDate } from "../../utils/date-utils";
import { useCalendarContext } from "./context";

export interface CalendarTitleProps extends TextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  formatStr?: string;
}

export function CalendarTitle(props: CalendarTitleProps) {
  const { children, style, formatStr = "MMMM yyyy", ...textProps } = props;
  const { currentMonth, styles } = useCalendarContext();

  const titleStyle = [styles?.headerTitle, style];

  return (
    <Text {...textProps} style={titleStyle}>
      {children ?? formatDate(currentMonth, formatStr)}
    </Text>
  );
}
