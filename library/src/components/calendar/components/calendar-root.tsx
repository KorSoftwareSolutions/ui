import React, { useState } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { CalendarContext } from "../context";
import { CalendarVariants } from "../variants";

export interface CalendarRootProps {
  variant?: keyof typeof CalendarVariants;
  children?: React.ReactNode;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  style?: StyleProp<ViewStyle>;
}

export function CalendarRoot(props: CalendarRootProps) {
  const { children, value, onChange, defaultMonth = new Date(), minDate, maxDate, style, ...viewProps } = props;
  const variantStyles = CalendarVariants[props.variant || "default"]();

  const [currentMonth, setCurrentMonth] = useState<Date>(defaultMonth);

  const containerStyle = [variantStyles.root, style];

  return (
    <CalendarContext.Provider
      value={{
        value,
        onChange,
        currentMonth,
        setCurrentMonth,
        styles: variantStyles,
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
