import {
  StyleSheet,
  type PressableProps,
  type PressableStateCallbackType,
  type ViewStyle,
} from "react-native";

export const calculateComposedStyles = <
  TStyle,
  State extends string | "default",
  Component extends string,
>(
  styles: Partial<Record<Component, Partial<Record<State, TStyle>>>> | null = {},
  state: State,
  component: Component,
  style?: TStyle,
): TStyle[] => {
  const result: TStyle[] = [];
  const componentStyles = styles?.[component];
  if (componentStyles && "default" in componentStyles && componentStyles["default"]) {
    result.push(componentStyles["default"] as TStyle);
  }
  if (componentStyles?.[state]) {
    result.push(componentStyles[state]);
  }
  if (style) {
    result.push(style);
  }
  return result;
};

const mergeProps = <TProps extends { style?: any }>(
  variantProps: TProps,
  globalProps: TProps | undefined,
): TProps => {
  if (!globalProps) return variantProps;
  const mergedProps = {
    ...globalProps,
    ...variantProps,
    style: [globalProps.style, variantProps.style],
  };
  return mergedProps;
};

const isPropsObject = (props: unknown): props is { style?: any } => {
  return typeof props === "object" && props !== null && "style" in props;
};

export const mergeStyles = <TStyle extends Record<string, any>>(
  variantStyles: TStyle,
  globalStyles: TStyle | undefined,
): TStyle => {
  if (!globalStyles) return variantStyles;
  const returnStyles = {} as TStyle;
  for (const key in variantStyles) {
    if (isPropsObject(variantStyles[key]) && isPropsObject(globalStyles[key])) {
      returnStyles[key] = mergeProps(variantStyles[key], globalStyles[key]);
    } else {
      // @ts-ignore
      returnStyles[key] = StyleSheet.flatten([variantStyles[key], globalStyles[key]]);
    }
  }
  return returnStyles;
};

export const extractPressableStyles = (
  style: PressableProps["style"],
  props: PressableStateCallbackType,
): ViewStyle => {
  if (typeof style === "function") {
    return style(props) as ViewStyle;
  }
  return style as ViewStyle;
};
