import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import {
  Calendar,
  CalendarTimeline,
  Typography,
  WeekCalendar,
} from "@korsolutions/ui";
import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";

interface MyEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

function createSampleEvents(): MyEvent[] {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();

  return [
    {
      id: "1",
      title: "Team Standup",
      start: new Date(y, m, d, 9, 0),
      end: new Date(y, m, d, 9, 30),
      color: "hsl(210, 80%, 50%)",
    },
    {
      id: "2",
      title: "Design Review",
      start: new Date(y, m, d, 11, 0),
      end: new Date(y, m, d, 12, 0),
      color: "hsl(150, 60%, 40%)",
    },
    {
      id: "3",
      title: "Lunch",
      start: new Date(y, m, d, 12, 30),
      end: new Date(y, m, d, 13, 30),
      color: "hsl(30, 80%, 50%)",
    },
    {
      id: "4",
      title: "Sprint Planning",
      start: new Date(y, m, d + 1, 10, 0),
      end: new Date(y, m, d + 1, 11, 30),
      color: "hsl(270, 60%, 50%)",
    },
    {
      id: "5",
      title: "1:1 with Manager",
      start: new Date(y, m, d + 2, 23, 0),
      end: new Date(y, m, d + 3, 0, 0),
      color: "hsl(340, 70%, 50%)",
    },
  ];
}

function EventBlock({ event }: { event: MyEvent }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: `${event.color}40`,
        borderLeftWidth: 3,
        borderLeftColor: event.color,
        borderRadius: 4,
        padding: 6,
        overflow: "hidden",
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "600" }} numberOfLines={1}>
        {event.title}
      </Text>
      <Text style={{ fontSize: 10, opacity: 0.8 }} numberOfLines={1}>
        {event.start.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}{" "}
        -{" "}
        {event.end.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
}

export default function CalendarScreen() {
  return (
    <ComponentScreenLayout title="Calendar">
      <UseCaseSection title="Month Calendar">
        <MonthExample />
      </UseCaseSection>
      <UseCaseSection title="Week Calendar">
        <WeekExample />
      </UseCaseSection>
      <UseCaseSection title="Timeline">
        <TimelineExample />
      </UseCaseSection>
      <UseCaseSection title="Week + Timeline">
        <CombinedExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function MonthExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <View>
      <Calendar.Root value={selectedDate} onChange={setSelectedDate}>
        <Calendar.Header>
          <Calendar.Title />
          <Calendar.NavButtons />
        </Calendar.Header>
        <Calendar.CalendarWeekLabels />
        <Calendar.Weeks />
      </Calendar.Root>
      <View style={{ marginTop: 16 }}>
        <Typography variant="body-sm">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
        </Typography>
      </View>
    </View>
  );
}

function WeekExample() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <View>
      <WeekCalendar value={selectedDate} onChange={setSelectedDate} />
      <View style={{ marginTop: 16 }}>
        <Typography variant="body-sm">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
        </Typography>
      </View>
    </View>
  );
}

function TimelineExample() {
  const events = useMemo(() => createSampleEvents(), []);

  return (
    <CalendarTimeline
      date={new Date()}
      events={events}
      getStart={(e) => e.start}
      getEnd={(e) => e.end}
      keyExtractor={(e) => e.id}
      renderEvent={(event) => <EventBlock event={event} />}
      style={{ maxHeight: 480 }}
    />
  );
}

function CombinedExample() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const events = useMemo(() => createSampleEvents(), []);
  const markedDates = useMemo(() => events.map((e) => e.start), [events]);

  const handleDateChange = (date: Date | null) => {
    if (date) setSelectedDate(date);
  };

  return (
    <View style={{ gap: 16 }}>
      <WeekCalendar
        value={selectedDate}
        onChange={handleDateChange}
        markedDates={markedDates}
      />
      <CalendarTimeline
        date={selectedDate}
        events={events}
        getStart={(e) => e.start}
        getEnd={(e) => e.end}
        keyExtractor={(e) => e.id}
        renderEvent={(event) => <EventBlock event={event} />}
        style={{ maxHeight: 480 }}
      />
    </View>
  );
}
