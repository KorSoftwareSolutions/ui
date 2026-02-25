import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useComponentsConfig } from "../../../themes";
import {
  addWeeks,
  endOfWeek,
  formatDate,
  getWeekDates,
  isDateAfter,
  isDateBefore,
  startOfWeek,
  subWeeks,
} from "../../../utils/date-utils";
import {
  CalendarContext,
  type CalendarContextValue,
} from "../shared/calendar-context";
import { CalendarDay } from "../shared/calendar-day";
import type { CalendarNavButtonState } from "../shared/types";
import { WeekCalendarVariants } from "./variants";

const DEFAULT_WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export interface WeekCalendarProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultWeek?: Date;
  minDate?: Date;
  maxDate?: Date;
  markedDates?: Date[];
  weekDays?: string[];
  variant?: keyof typeof WeekCalendarVariants;
  style?: StyleProp<ViewStyle>;
}

const calculateNavState = (
  isDisabled: boolean,
  isHovered: boolean,
): CalendarNavButtonState => {
  if (isDisabled) return "disabled";
  if (isHovered) return "hovered";
  return "default";
};

export function WeekCalendar(props: WeekCalendarProps) {
  const {
    value,
    onChange,
    defaultWeek = new Date(),
    minDate,
    maxDate,
    markedDates,
    weekDays = DEFAULT_WEEK_DAYS,
    style,
  } = props;
  const styles = WeekCalendarVariants[props.variant || "default"]();
  const config = useComponentsConfig();
  const PrevIcon = config?.calendar?.prevIcon;
  const NextIcon = config?.calendar?.nextIcon;

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(defaultWeek),
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [prevHovered, setPrevHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);

  const currentMonth = currentWeekStart;

  const goToPrev = useCallback(() => {
    setCurrentWeekStart((prev) => subWeeks(prev, 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  }, []);

  const isPrevDisabled = useMemo(() => {
    if (!minDate) return false;
    const prevWeekEnd = endOfWeek(subWeeks(currentWeekStart, 1));
    return isDateBefore(prevWeekEnd, minDate);
  }, [currentWeekStart, minDate]);

  const isNextDisabled = useMemo(() => {
    if (!maxDate) return false;
    const nextWeekStart = addWeeks(currentWeekStart, 1);
    return isDateAfter(nextWeekStart, maxDate);
  }, [currentWeekStart, maxDate]);

  const prevState = calculateNavState(isPrevDisabled, prevHovered);
  const nextState = calculateNavState(isNextDisabled, nextHovered);

  const prevIconProps = StyleSheet.flatten([
    styles.navButtonIcon?.default,
    styles.navButtonIcon?.[prevState],
  ]);
  const nextIconProps = StyleSheet.flatten([
    styles.navButtonIcon?.default,
    styles.navButtonIcon?.[nextState],
  ]);

  // Strip logic
  const prevWeekDates = getWeekDates(subWeeks(currentWeekStart, 1));
  const currentWeekDates = getWeekDates(currentWeekStart);
  const nextWeekDates = getWeekDates(addWeeks(currentWeekStart, 1));
  const weeks = [prevWeekDates, currentWeekDates, nextWeekDates];
  const scrollKey = currentWeekStart.getTime();

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.round(offsetX / containerWidth);

      if (pageIndex === 0) {
        setCurrentWeekStart(subWeeks(currentWeekStart, 1));
      } else if (pageIndex === 2) {
        setCurrentWeekStart(addWeeks(currentWeekStart, 1));
      }
    },
    [containerWidth, currentWeekStart],
  );

  const contextValue = useMemo<CalendarContextValue>(
    () => ({
      value,
      onChange,
      currentMonth,
      goToPrev,
      goToNext,
      isPrevDisabled,
      isNextDisabled,
      minDate,
      maxDate,
      markedDates,
      styles,
      currentWeekStart,
      setCurrentWeekStart,
    }),
    [
      value,
      onChange,
      currentMonth,
      goToPrev,
      goToNext,
      isPrevDisabled,
      isNextDisabled,
      minDate,
      maxDate,
      markedDates,
      styles,
      currentWeekStart,
    ],
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      <View style={[styles.root, style]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {formatDate(currentMonth, "MMMM yyyy")}
          </Text>
          <View style={styles.navButtons}>
            <Pressable
              onPress={goToPrev}
              onHoverIn={() => setPrevHovered(true)}
              onHoverOut={() => setPrevHovered(false)}
              disabled={isPrevDisabled}
              style={[styles.navButton?.default, styles.navButton?.[prevState]]}
            >
              {PrevIcon ? (
                <PrevIcon {...prevIconProps} />
              ) : (
                <Text style={prevIconProps?.style}>‹</Text>
              )}
            </Pressable>
            <Pressable
              onPress={goToNext}
              onHoverIn={() => setNextHovered(true)}
              onHoverOut={() => setNextHovered(false)}
              disabled={isNextDisabled}
              style={[styles.navButton?.default, styles.navButton?.[nextState]]}
            >
              {NextIcon ? (
                <NextIcon {...nextIconProps} />
              ) : (
                <Text style={nextIconProps?.style}>›</Text>
              )}
            </Pressable>
          </View>
        </View>

        {/* Week day labels */}
        <View style={styles.weekLabels}>
          {weekDays.map((day, index) => (
            <Text key={index} numberOfLines={1} style={styles.weekLabel}>
              {day}
            </Text>
          ))}
        </View>

        {/* Swipeable strip */}
        <View
          style={styles.swipeContainer}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
          {containerWidth > 0 && (
            <ScrollView
              ref={scrollRef}
              key={scrollKey}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onMomentumScrollEnd={handleScrollEnd}
              onLayout={() => {
                if (Platform.OS === "web") {
                  scrollRef.current?.scrollTo({
                    x: containerWidth,
                    animated: false,
                  });
                }
              }}
              {...(Platform.OS !== "web"
                ? { contentOffset: { x: containerWidth, y: 0 } }
                : {})}
            >
              {weeks.map((weekDates, weekIndex) => (
                <View
                  key={weekIndex}
                  style={[styles.weekStrip, { width: containerWidth }]}
                >
                  {weekDates.map((date, dayIndex) => (
                    <CalendarDay key={dayIndex} date={date} />
                  ))}
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </CalendarContext.Provider>
  );
}
