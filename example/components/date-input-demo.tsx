import { Calendar, Input, Popover, PopoverTriggerRef } from "@korsolutions/ui";
import React, { useRef, useState } from "react";
import { Pressable } from "react-native";

export function DateInputDemo() {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const popoverTriggerRef = useRef<PopoverTriggerRef>(null);

  return (
    <Popover.Root>
      <Popover.Trigger ref={popoverTriggerRef}>
        <Pressable>
          <Input
            value={dateValue ? dateValue.toLocaleDateString() : ""}
            placeholder="MM/DD/YYYY"
            editable={false}
            pointerEvents="none"
          />
        </Pressable>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content>
          <Calendar.Root
            value={dateValue}
            onChange={(date) => {
              setDateValue(date);
              popoverTriggerRef.current?.close();
            }}
          >
            <Calendar.Header>
              <Calendar.Title />
              <Calendar.NavButtons />
            </Calendar.Header>
            <Calendar.CalendarWeekLabels />
            <Calendar.Weeks />
          </Calendar.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
