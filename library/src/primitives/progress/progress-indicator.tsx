import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useProgress } from "./context";

export interface ProgressIndicatorProps {
  render?: (props: ProgressIndicatorProps & { percentage: number }) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function ProgressIndicator(props: ProgressIndicatorProps) {
  const progress = useProgress();

  const percentage = Math.min(Math.max((progress.value / progress.max) * 100, 0), 100);

  const composedStyle = calculateComposedStyles(progress.styles, progress.state, "indicator", props.style);

  const Component = props.render ?? View;
  return <Component {...props} percentage={percentage} style={[composedStyle, { width: `${percentage}%` }]} />;
}
