import { type CheckboxStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useCheckboxVariantDefault = (): CheckboxStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): CheckboxStyles => ({
      root: {
        default: {
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 12,
        },
      },
      indicator: {
        default: {
          width: 20,
          height: 20,
          borderRadius: radius / 2,
          borderWidth: 2,
          borderColor: colors.border,
          backgroundColor: colors.background,
          marginTop: 2,
          alignItems: "center",
          justifyContent: "center",
        },
        checked: {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        disabled: {
          opacity: 0.5,
        },
      },
      checkmark: {
        default: {
          color: colors.primaryForeground,
          fontSize: 14,
          fontWeight: "bold",
          lineHeight: 16,
        },
      },
      content: {
        default: {
          flex: 1,
        },
      },
      title: {
        default: {
          color: colors.foreground,
          fontSize,
          fontFamily,
          fontWeight: "500",
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      description: {
        default: {
          color: colors.mutedForeground,
          fontSize: fontSize * 0.875,
          fontFamily,
          marginTop: 2,
        },
        disabled: {
          opacity: 0.7,
        },
      },
    }),
  );
};
