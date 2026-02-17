import { Platform } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type InputStyles } from "../types";

export function useInputVariantDefault(): InputStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): InputStyles => ({
      default: {
        placeholderTextColor: colors.mutedForeground,
        selectionColor: colors.primary,
        style: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontFamily,
          fontSize,
          height: 48,
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
    }),
  );
}
