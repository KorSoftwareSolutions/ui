import { type SelectStyles } from "../..";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export function useSelectVariantDefault(): SelectStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): SelectStyles => ({
      root: {
        default: {},
        disabled: {},
      },
      trigger: {
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          minHeight: 48,
        },
        disabled: {
          backgroundColor: colors.muted,
        },
      },
      value: {
        default: {
          fontFamily,
          fontSize,
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      placeholder: {
        default: {
          fontFamily,
          fontSize,
          color: colors.mutedForeground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      overlay: {
        default: {},
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
        },
        disabled: {},
      },
      option: {
        default: {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontFamily,
          fontSize,
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
    }),
  );
}
