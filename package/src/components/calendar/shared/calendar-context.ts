import React from "react";
import type { BaseCalendarStyles } from "./types";

export interface CalendarContextValue {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  currentMonth: Date;
  goToPrev: () => void;
  goToNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  minDate?: Date;
  maxDate?: Date;
  markedDates?: Date[];

  // WeekCalendar-specific
  currentWeekStart?: Date;
  setCurrentWeekStart?: (date: Date) => void;

  styles?: BaseCalendarStyles;
}

export const CalendarContext = React.createContext<
  CalendarContextValue | undefined
>(undefined);

export const useCalendarContext = () => {
  const context = React.useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "Calendar components must be used within a Calendar or WeekCalendar Root",
    );
  }
  return context;
};
