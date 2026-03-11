import { Platform } from "react-native";
import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type InputStyles } from "../types";

export function useInputVariantSecondary(size: Size): InputStyles {
  return useThemedStyles(({ colors, radius, fontFamily, sizeScale }): InputStyles => {
    const s = sizeScale(size);

    return {
      default: {
        placeholderTextColor: colors.mutedForeground,
        selectionColor: colors.primary,
        style: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.background,
          paddingHorizontal: s.paddingHorizontal,
          fontFamily,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          height: s.height,
          color: colors.foreground,
          outlineWidth: 0,
          ...Platform.select({
            default: {},
            web: {
              outline: "none",
            },
          }),
        },
      },
      focused: {
        style: {
          borderColor: colors.primary,
        },
      },
      disabled: {
        style: {
          color: colors.mutedForeground,
          backgroundColor: colors.muted,
        },
      },
    };
  });
}
