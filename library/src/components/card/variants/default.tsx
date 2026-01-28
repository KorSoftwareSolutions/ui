import { type CardStyles } from "@/components";
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
        },
      },
      header: {
        default: {
          paddingHorizontal: 24,
          paddingTop: 24,
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
          padding: 24,
          gap: 24,
        },
      },
      footer: {
        default: {
          flexDirection: "row",
          paddingHorizontal: 24,
          paddingBottom: 24,
          gap: 24,
        },
      },
    }),
  );
}
