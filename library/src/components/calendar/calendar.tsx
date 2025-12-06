import React from "react";
import { CalendarPrimitive } from "@/primitives";
import { CalendarVariants } from "./variants";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  variant?: keyof typeof CalendarVariants;
  weekDays?: string[];
}

export function Calendar(props: CalendarProps) {
  const { variant = "default", weekDays, ...rootProps } = props;
  const useVariantStyles = CalendarVariants[variant];
  const variantStyles = useVariantStyles();

  return (
    <CalendarPrimitive.Root {...rootProps} styles={variantStyles}>
      <CalendarPrimitive.Header>
        <CalendarPrimitive.NavButton direction="prev" />
        <CalendarPrimitive.Title />
        <CalendarPrimitive.NavButton direction="next" />
      </CalendarPrimitive.Header>
      <CalendarPrimitive.CalendarWeekLabels weekDays={weekDays} />
      <CalendarPrimitive.Weeks />
    </CalendarPrimitive.Root>
  );
}
