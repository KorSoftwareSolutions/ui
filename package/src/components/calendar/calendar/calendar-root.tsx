import React, { useCallback, useMemo, useState } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { addMonths, subMonths } from "../../../utils/date-utils";
import { CalendarContext } from "../shared/calendar-context";
import { CalendarVariants } from "./variants";

export interface CalendarRootProps {
  variant?: keyof typeof CalendarVariants;
  children?: React.ReactNode;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  markedDates?: Date[];
  style?: StyleProp<ViewStyle>;
}

export function CalendarRoot(props: CalendarRootProps) {
  const {
    children,
    value,
    onChange,
    defaultMonth = new Date(),
    minDate,
    maxDate,
    markedDates,
    style,
  } = props;
  const variantStyles = CalendarVariants[props.variant || "default"]();

  const [currentMonth, setCurrentMonth] = useState<Date>(defaultMonth);

  const goToPrev = useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const isPrevDisabled = useMemo(() => {
    if (!minDate) return false;
    return subMonths(currentMonth, 1) < minDate;
  }, [currentMonth, minDate]);

  const isNextDisabled = useMemo(() => {
    if (!maxDate) return false;
    return addMonths(currentMonth, 1) > maxDate;
  }, [currentMonth, maxDate]);

  const containerStyle = [variantStyles.root, style];

  return (
    <CalendarContext.Provider
      value={{
        value,
        onChange,
        currentMonth,
        goToPrev,
        goToNext,
        isPrevDisabled,
        isNextDisabled,
        styles: variantStyles,
        minDate,
        maxDate,
        markedDates,
      }}
    >
      <View style={containerStyle}>{children}</View>
    </CalendarContext.Provider>
  );
}
