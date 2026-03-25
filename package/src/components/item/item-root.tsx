import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles, mergeStyles } from "../../utils/calculate-styles";
import { ItemContext } from "./context";
import { ItemVariants } from "./variants";

export interface ItemRootProps {
  variant?: keyof typeof ItemVariants;
  size?: "default" | "sm" | "xs";
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function ItemRoot(props: PropsWithRender<ItemRootProps>) {
  const size = props.size ?? "default";
  const variantStyles = ItemVariants[props.variant || "default"](size);
  const componentConfig = useComponentConfig("item");

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const composedStyle = calculateComposedStyles(mergedStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <ItemContext.Provider
      value={{
        state: "default",
        styles: mergedStyles,
        size,
      }}
    >
      <Component {...props} style={composedStyle} />
    </ItemContext.Provider>
  );
}
