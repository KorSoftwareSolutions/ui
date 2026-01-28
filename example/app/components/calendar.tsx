import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Calendar, Typography } from "@korsolutions/ui";
import React, { useState } from "react";
import { View } from "react-native";

export default function CalendarComponentScreen() {
  return (
    <ComponentScreenLayout title="Calendar">
      <UseCaseSection title="Default">
        <DefaultExample />
      </UseCaseSection>

      {/* <UseCaseSection title="With Min/Max Dates">
        <Calendar value={selectedDate} onChange={setSelectedDate} minDate={new Date(2025, 10, 1)} maxDate={new Date(2025, 10, 31)} />
      </UseCaseSection>

      <UseCaseSection title="Custom Week Days">
        <Calendar value={selectedDate} onChange={setSelectedDate} weekDays={["S", "M", "T", "W", "T", "F", "S"]} />
      </UseCaseSection> */}
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <View>
      <Calendar.Root value={selectedDate} onChange={setSelectedDate}>
        <Calendar.Header>
          <Calendar.Title />
        </Calendar.Header>
        <Calendar.CalendarWeekLabels />
        <Calendar.Weeks />
      </Calendar.Root>
      <View style={{ marginTop: 16 }}>
        <Typography variant="body-sm">Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}</Typography>
      </View>
    </View>
  );
}
