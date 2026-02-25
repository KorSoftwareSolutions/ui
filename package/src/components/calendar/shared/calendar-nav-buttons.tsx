import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useComponentsConfig } from "../../../themes";
import { useCalendarContext } from "./calendar-context";
import type { CalendarNavButtonState } from "./types";

export interface CalendarNavButtonsProps {
  style?: StyleProp<ViewStyle>;
}

const calculateState = (
  isDisabled: boolean,
  isHovered: boolean,
): CalendarNavButtonState => {
  if (isDisabled) return "disabled";
  if (isHovered) return "hovered";
  return "default";
};

export function CalendarNavButtons(props: CalendarNavButtonsProps) {
  const { style } = props;
  const { goToPrev, goToNext, isPrevDisabled, isNextDisabled, styles } =
    useCalendarContext();
  const config = useComponentsConfig();
  const PrevIcon = config?.calendar?.prevIcon;
  const NextIcon = config?.calendar?.nextIcon;
  const [prevHovered, setPrevHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);

  const prevState = calculateState(isPrevDisabled, prevHovered);
  const nextState = calculateState(isNextDisabled, nextHovered);

  const prevIconProps = StyleSheet.flatten([
    styles?.navButtonIcon?.default,
    styles?.navButtonIcon?.[prevState],
  ]);
  const nextIconProps = StyleSheet.flatten([
    styles?.navButtonIcon?.default,
    styles?.navButtonIcon?.[nextState],
  ]);

  const composedStyle = [styles?.navButtons, style];

  return (
    <View style={composedStyle}>
      <Pressable
        onPress={goToPrev}
        onHoverIn={() => setPrevHovered(true)}
        onHoverOut={() => setPrevHovered(false)}
        disabled={isPrevDisabled}
        style={[styles?.navButton?.default, styles?.navButton?.[prevState]]}
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
        style={[styles?.navButton?.default, styles?.navButton?.[nextState]]}
      >
        {NextIcon ? (
          <NextIcon {...nextIconProps} />
        ) : (
          <Text style={nextIconProps?.style}>›</Text>
        )}
      </Pressable>
    </View>
  );
}
