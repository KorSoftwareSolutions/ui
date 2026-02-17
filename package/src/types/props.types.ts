import type { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

export type PropsWithRender<P> = P & {
  render?: (props: P) => React.ReactNode;
};

export type PropsWithRequiredRender<P> = P & {
  render: (props: P) => React.ReactNode;
};

export type SvgProps = {
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  style?: StyleProp<ViewStyle & TextStyle>;
};
