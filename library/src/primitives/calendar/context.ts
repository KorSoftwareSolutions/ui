import React from "react";
import { CalendarStyles } from "./types";

export interface CalendarContextValue {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  currentMonth: Date;
  setCurrentMonth: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;

  styles?: CalendarStyles;
}

export const CalendarContext = React.createContext<CalendarContextValue | undefined>(undefined);

export const useCalendarContext = () => {
  const context = React.useContext(CalendarContext);
  if (!context) {
    throw new Error("Calendar components must be used within CalendarRoot");
  }
  return context;
};
