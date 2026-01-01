import React, { useState } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { CalendarContext } from "./context";
import type { CalendarStyles } from "./types";

export interface CalendarRootProps {
  children?: React.ReactNode;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  style?: StyleProp<ViewStyle>;
  styles?: CalendarStyles;
}

export function CalendarRoot(props: CalendarRootProps) {
  const { children, value, onChange, defaultMonth = new Date(), minDate, maxDate, style, styles, ...viewProps } = props;

  const [currentMonth, setCurrentMonth] = useState<Date>(defaultMonth);

  const containerStyle = [styles?.root, style];

  return (
    <CalendarContext.Provider
      value={{
        value,
        onChange,
        currentMonth,
        setCurrentMonth,
        styles,
        minDate,
        maxDate,
      }}
    >
      <View {...viewProps} style={containerStyle}>
        {children}
      </View>
    </CalendarContext.Provider>
  );
}
