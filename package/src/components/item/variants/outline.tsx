import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { ItemStyles } from "../types";

const sizeConfig = {
  default: { padding: 12, gap: 12, iconBox: 40, fontSize: 1, descFontSize: 0.875 },
  sm: { padding: 8, gap: 10, iconBox: 32, fontSize: 0.875, descFontSize: 0.8125 },
  xs: { padding: 6, gap: 8, iconBox: 28, fontSize: 0.8125, descFontSize: 0.75 },
} as const;

export function useItemVariantOutline(size: "default" | "sm" | "xs" = "default"): ItemStyles {
  const s = sizeConfig[size];

  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): ItemStyles => ({
      root: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          padding: s.padding,
          gap: s.gap,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
        },
      },
      media: {
        default: {
          alignItems: "center",
          justifyContent: "center",
        },
      },
      mediaIcon: {
        default: {
          width: s.iconBox,
          height: s.iconBox,
          borderRadius: radius,
          backgroundColor: colors.muted,
          alignItems: "center",
          justifyContent: "center",
        },
      },
      content: {
        default: {
          flex: 1,
          gap: 2,
        },
      },
      title: {
        default: {
          fontFamily,
          fontSize: fontSize * s.fontSize,
          lineHeight: Math.round(fontSize * s.fontSize * 1.3),
          fontWeight: "500",
          color: colors.foreground,
        },
      },
      description: {
        default: {
          fontFamily,
          fontSize: fontSize * s.descFontSize,
          lineHeight: Math.round(fontSize * s.descFontSize * 1.4),
          color: colors.mutedForeground,
        },
      },
      actions: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
      },
    }),
  );
}
