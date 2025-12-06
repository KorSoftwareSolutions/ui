import React from "react";
import { CalendarPrimitive, CalendarRootProps } from "@/primitives";
import { CalendarVariants } from "./variants";

export interface CalendarProps {
  value?: CalendarRootProps["value"];
  onChange?: CalendarRootProps["onChange"];
  defaultMonth?: CalendarRootProps["defaultMonth"];
  minDate?: CalendarRootProps["minDate"];
  maxDate?: CalendarRootProps["maxDate"];
  weekDays?: string[];

  variant?: keyof typeof CalendarVariants;
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
