import { InputStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export function useInputVariantDefault(): InputStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily }): InputStyles => ({
      root: {
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontFamily,
        },
        focused: {
          borderColor: colors.primary,
        },
        disabled: {
          backgroundColor: colors.muted,
        },
      },
    })
  );
}
