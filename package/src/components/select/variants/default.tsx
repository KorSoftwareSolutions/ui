import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type SelectStyles } from "../types";

export function useSelectVariantDefault(size: Size): SelectStyles {
  return useThemedStyles(({ colors, radius, fontFamily, sizeScale }): SelectStyles => {
    const s = sizeScale(size);

    return {
      root: {
        default: {},
        disabled: {},
      },
      trigger: {
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          justifyContent: "center",
          paddingHorizontal: s.paddingHorizontal,
          minHeight: s.height,
        },
        disabled: {
          backgroundColor: colors.muted,
        },
      },
      value: {
        default: {
          fontFamily,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      placeholder: {
        default: {
          fontFamily,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          color: colors.mutedForeground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      overlay: {
        default: {
          zIndex: 999,
        },
        disabled: {},
      },
      content: {
        default: {
          backgroundColor: colors.surface,
          borderRadius: radius,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 4,
          gap: 4,
          zIndex: 1000,
        },
        disabled: {},
      },
      option: {
        default: {
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          fontFamily,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          color: colors.foreground,
          borderRadius: radius / 2,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        selected: {
          backgroundColor: colors.muted,
        },
        hovered: {
          backgroundColor: colors.muted,
        },
      },
    };
  });
}
