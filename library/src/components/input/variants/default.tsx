import { InputStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export function useInputVariantDefault(): InputStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily }): InputStyles => ({
      default: {
        placeholderTextColor: colors.mutedForeground,
        style: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          paddingVertical: 12,
          paddingHorizontal: 16,
          outlineWidth: 0,
          fontFamily,
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
    })
  );
}
