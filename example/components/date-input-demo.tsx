import { Calendar, Input, Popover } from "@korsolutions/ui/components";
import React, { useState } from "react";
import { Pressable } from "react-native";

export function DateInputDemo() {
  const [dateValue, setDateValue] = useState<Date | null>(null);

  return (
    <Popover
      trigger={
        <Pressable>
          <Input value={dateValue ? dateValue.toLocaleDateString() : ""} placeholder="MM/DD/YYYY" editable={false} />
        </Pressable>
      }
    >
      {({ close }) => (
        <Calendar
          value={dateValue}
          onChange={(date) => {
            setDateValue(date);
            close();
          }}
        />
      )}
    </Popover>
  );
}
