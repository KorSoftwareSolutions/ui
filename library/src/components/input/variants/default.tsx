import { type InputStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

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
          outlineWidth: 0,
          fontFamily,
          fontSize,
          height: 48,
          color: colors.foreground,
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
