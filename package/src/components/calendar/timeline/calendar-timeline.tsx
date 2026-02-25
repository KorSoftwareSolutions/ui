import React, { useMemo } from "react";
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { isDateSameDay } from "../../../utils/date-utils";
import { TimelineVariants } from "./variants";

const HOUR_HEIGHT = 60;

function formatHour(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}

function getMinutesFromStartOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export interface TimelineEventLayout {
  top: number;
  height: number;
  left: string;
  width: string;
}

export interface CalendarTimelineProps<T> {
  events?: T[];
  date: Date;
  startHour?: number;
  endHour?: number;
  getStart: (event: T) => Date;
  getEnd: (event: T) => Date;
  keyExtractor: (event: T) => string;
  renderEvent: (event: T, layout: TimelineEventLayout) => React.ReactNode;
  variant?: keyof typeof TimelineVariants;
  style?: StyleProp<ViewStyle>;
}

function groupOverlappingEvents<T>(
  events: T[],
  getStart: (e: T) => Date,
  getEnd: (e: T) => Date,
): T[][] {
  const sorted = [...events].sort(
    (a, b) => getStart(a).getTime() - getStart(b).getTime(),
  );
  const groups: T[][] = [];

  for (const event of sorted) {
    let placed = false;
    const eStart = getStart(event);
    const eEnd = getEnd(event);

    for (const group of groups) {
      const overlaps = group.some((g) => {
        const gStart = getStart(g);
        const gEnd = getEnd(g);
        return (
          (eStart >= gStart && eStart < gEnd) ||
          (eEnd > gStart && eEnd <= gEnd) ||
          (eStart <= gStart && eEnd >= gEnd)
        );
      });

      if (overlaps) {
        group.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groups.push([event]);
    }
  }

  return groups;
}

export function CalendarTimeline<T>(props: CalendarTimelineProps<T>) {
  const {
    date,
    startHour = 0,
    endHour = 24,
    getStart,
    getEnd,
    keyExtractor,
    renderEvent,
    style,
  } = props;
  const variantStyles = TimelineVariants[props.variant || "default"]();

  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let i = startHour; i < endHour; i++) {
      arr.push(i);
    }
    return arr;
  }, [startHour, endHour]);

  const allEvents = props.events ?? [];

  const dayEvents = useMemo(() => {
    return allEvents.filter((event) => isDateSameDay(getStart(event), date));
  }, [allEvents, date, getStart]);

  const eventGroups = useMemo(
    () => groupOverlappingEvents(dayEvents, getStart, getEnd),
    [dayEvents, getStart, getEnd],
  );

  const now = new Date();
  const isToday = isDateSameDay(now, date);
  const currentTimePosition = isToday
    ? ((getMinutesFromStartOfDay(now) - startHour * 60) / 60) * HOUR_HEIGHT
    : null;

  return (
    <ScrollView
      style={[variantStyles.container, style]}
      showsVerticalScrollIndicator
    >
      <View style={variantStyles.timeline}>
        {/* Time column */}
        <View style={variantStyles.timeColumn}>
          {hours.map((hour) => (
            <View key={hour} style={variantStyles.timeSlot}>
              <Text style={variantStyles.timeText}>{formatHour(hour)}</Text>
            </View>
          ))}
        </View>

        {/* Events column */}
        <View style={variantStyles.eventsColumn}>
          {hours.map((hour) => (
            <View key={hour} style={variantStyles.hourLine} />
          ))}

          {/* Current time indicator */}
          {currentTimePosition != null && currentTimePosition >= 0 && (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: currentTimePosition,
                flexDirection: "row",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <View style={variantStyles.currentTimeDot} />
              <View style={variantStyles.currentTimeLineBar} />
            </View>
          )}

          {/* Events */}
          {eventGroups.map((group) =>
            group.map((event) => {
              const startMinutes = getMinutesFromStartOfDay(getStart(event));
              let endMinutes = getMinutesFromStartOfDay(getEnd(event));
              // Handle midnight (0:00) or end times on the next day
              if (endMinutes <= startMinutes) {
                endMinutes = endHour * 60;
              }
              const duration = endMinutes - startMinutes;

              const top =
                ((startMinutes - startHour * 60) / 60) * HOUR_HEIGHT + 1;
              const height = (duration / 60) * HOUR_HEIGHT - 3;

              const indexInGroup = group.indexOf(event);
              const totalInGroup = group.length;
              const eventWidth = `${100 / totalInGroup - 1}%`;
              const left = `${(100 / totalInGroup) * indexInGroup}%`;

              const layout: TimelineEventLayout = {
                top,
                height: Math.max(height, 20),
                left,
                width: eventWidth,
              };

              return (
                <View
                  key={keyExtractor(event)}
                  style={{
                    position: "absolute",
                    top: layout.top,
                    height: layout.height,
                    left: layout.left as unknown as number,
                    width: layout.width as unknown as number,
                  }}
                >
                  {renderEvent(event, layout)}
                </View>
              );
            }),
          )}
        </View>
      </View>
    </ScrollView>
  );
}
