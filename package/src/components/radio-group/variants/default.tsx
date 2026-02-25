import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { RadioGroupStyles } from "../types";

export const useRadioGroupVariantDefault = (): RadioGroupStyles => {
  return useThemedStyles(
    ({ colors, fontFamily, fontSize }): RadioGroupStyles => ({
      root: {
        default: {
          gap: 8,
        },
      },
      item: {
        default: {
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 12,
        },
        disabled: {
          opacity: 0.5,
        },
      },
      indicator: {
        default: {
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: colors.border,
          backgroundColor: colors.background,
          marginTop: 2,
          alignItems: "center",
          justifyContent: "center",
        },
        selected: {
          borderColor: colors.primary,
        },
        disabled: {
          opacity: 0.5,
        },
      },
      dot: {
        default: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.primary,
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
