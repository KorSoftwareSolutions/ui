import React, { useState } from "react";
import {
  Pressable,
  type CursorValue,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useComponentConfig } from "../../themes/provider";
import type { SvgProps } from "../../types/props.types";
import { mergeStyles } from "../../utils/calculate-styles";
import type { Size } from "../../utils/size-scale";
import type { IconButtonState } from "./types";
import { IconButtonVariants } from "./variants";

export interface IconButtonProps extends Omit<PressableProps, "disabled" | "children"> {
  render: (props: SvgProps) => React.ReactNode;
  variant?: keyof typeof IconButtonVariants;
  size?: Size;
  isDisabled?: boolean;
  color?: SvgProps["color"];
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (props: IconButtonProps, isHovered: boolean): IconButtonState => {
  if (props.isDisabled) return "disabled";
  if (isHovered) return "hovered";
  return "default";
};

const cursorValue = (state: IconButtonState): CursorValue => {
  if (state === "disabled") return "not-allowed" as CursorValue;
  return "pointer";
};

export function IconButton(props: IconButtonProps) {
  const {
    render: IconComponent,
    variant = "default",
    size = "md",
    isDisabled,
    color,
    strokeWidth,
    style,
    ...rest
  } = props;

  const variantStyles = IconButtonVariants[variant](size);
  const componentConfig = useComponentConfig("iconButton");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const [isHovered, setIsHovered] = useState(false);
  const state = calculateState(props, isHovered);

  const handlePress: PressableProps["onPress"] = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    rest.onPress?.(event);
  };

  const iconProps: SvgProps = {
    size: mergedStyles.icon?.default?.size,
    color: color ?? mergedStyles.icon?.[state]?.color ?? mergedStyles.icon?.default?.color,
    strokeWidth: strokeWidth ?? mergedStyles.icon?.default?.strokeWidth,
  };

  return (
    <Pressable
      {...rest}
      onPress={handlePress}
      onHoverIn={(e) => {
        setIsHovered(true);
        rest.onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        setIsHovered(false);
        rest.onHoverOut?.(e);
      }}
      disabled={isDisabled}
      style={[
        mergedStyles.root?.default,
        mergedStyles.root?.[state],
        { cursor: cursorValue(state) },
        style,
      ]}
    >
      <IconComponent {...iconProps} />
    </Pressable>
  );
}
