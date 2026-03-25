import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles, mergeStyles } from "../../utils/calculate-styles";
import { DescriptionListContext } from "./context";
import { DescriptionListVariants } from "./variants";

export interface DescriptionListRootProps {
  variant?: keyof typeof DescriptionListVariants;
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function DescriptionListRoot(props: PropsWithRender<DescriptionListRootProps>) {
  const variantStyles = DescriptionListVariants[props.variant || "default"]();
  const componentConfig = useComponentConfig("descriptionList");

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const composedStyle = calculateComposedStyles(mergedStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <DescriptionListContext.Provider
      value={{
        state: "default",
        styles: mergedStyles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </DescriptionListContext.Provider>
  );
}
