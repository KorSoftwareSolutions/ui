import React from "react";
import { Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { useCalendarContext } from "./context";

export interface CalendarWeekLabelProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

function CalendarWeekLabel(props: CalendarWeekLabelProps) {
  const { styles } = useCalendarContext();

  const composedStyle = [styles?.weekLabel, props.style];

  return (
    <Text numberOfLines={1} style={composedStyle}>
      {props.children}
    </Text>
  );
}

export interface CalendarWeekLabelsProps {
  weekDays?: string[];

  style?: StyleProp<ViewStyle>;
}

const DEFAULT_WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CalendarWeekLabels(props: CalendarWeekLabelsProps) {
  const { weekDays = DEFAULT_WEEK_DAYS, style } = props;
  const { styles } = useCalendarContext();

  const composedStyle = [styles?.weekLabels, style];

  return (
    <View style={composedStyle}>
      {weekDays.map((day, index) => (
        <CalendarWeekLabel key={index} style={styles?.weekLabel}>
          {day}
        </CalendarWeekLabel>
      ))}
    </View>
  );
}
