import { CardStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export function useCardVariantDefault(): CardStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): CardStyles => ({
      root: {
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          paddingVertical: 24,
          gap: 24,
        },
      },
      header: {
        default: {
          paddingHorizontal: 24,
        },
      },
      title: {
        default: {
          fontFamily,
          fontSize: fontSize * 1.25,
          fontWeight: "600",
          color: colors.foreground,
        },
      },
      body: {
        default: {
          paddingHorizontal: 24,
          gap: 24,
        },
      },
    })
  );
}
