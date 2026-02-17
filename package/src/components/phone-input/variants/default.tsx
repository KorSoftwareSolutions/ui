import { Platform } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { PhoneInputStyles } from "../types";

export function usePhoneInputVariantDefault(): PhoneInputStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): PhoneInputStyles => ({
      root: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          height: 48,
          overflow: "hidden",
          outlineWidth: 0,
        },
        focused: {
          borderColor: colors.primary,
        },
        disabled: {
          backgroundColor: colors.muted,
        },
      },
      countryButton: {
        default: {
          paddingHorizontal: 12,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        },
      },
      countryButtonText: {
        default: {
          fontFamily,
          fontSize,
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      separator: {
        default: {
          width: 1,
          alignSelf: "center",
          height: "60%",
          backgroundColor: colors.border,
        },
      },
      input: {
        default: {
          flex: 1,
          paddingHorizontal: 12,
          fontFamily,
          fontSize,
          color: colors.foreground,
          height: "100%",
          outlineWidth: 0,
          ...Platform.select({
            default: {},
            web: {
              outline: "none",
            },
          }),
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      pickerOverlay: {
        default: {},
      },
      pickerContent: {
        default: {
          backgroundColor: colors.surface,
          borderRadius: radius,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 4,
          maxHeight: 300,
        },
      },
      pickerOption: {
        default: {
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: radius / 2,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
        selected: {
          backgroundColor: colors.muted,
        },
      },
      pickerOptionText: {
        default: {
          fontFamily,
          fontSize,
          color: colors.foreground,
        },
      },
      pickerSearch: {
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          paddingVertical: 8,
          paddingHorizontal: 12,
          fontFamily,
          fontSize: fontSize * 0.875,
          color: colors.foreground,
          marginBottom: 4,
          outlineWidth: 0,
        },
      },
    }),
  );
}
