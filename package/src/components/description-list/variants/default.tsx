import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { DescriptionListStyles } from "../types";

export function useDescriptionListVariantDefault(): DescriptionListStyles {
  return useThemedStyles(
    ({ colors, fontFamily, fontSize }): DescriptionListStyles => ({
      root: {
        default: {
          gap: 0,
        },
      },
      item: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          gap: 16,
        },
      },
      term: {
        default: {
          fontFamily,
          fontSize: fontSize * 0.875,
          lineHeight: Math.round(fontSize * 0.875 * 1.5),
          fontWeight: "500",
          color: colors.mutedForeground,
          width: "40%",
        },
      },
      details: {
        default: {
          fontFamily,
          fontSize: fontSize * 0.875,
          lineHeight: Math.round(fontSize * 0.875 * 1.5),
          color: colors.foreground,
          flex: 1,
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
