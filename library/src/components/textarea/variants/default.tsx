import { type TextareaStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

export function useTextareaVariantDefault(): TextareaStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): TextareaStyles => ({
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
          minHeight: 120,
          textAlignVertical: "top",
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
