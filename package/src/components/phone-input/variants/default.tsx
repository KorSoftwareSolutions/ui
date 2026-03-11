import { Platform } from "react-native";
import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { PhoneInputStyles } from "../types";

export function usePhoneInputVariantDefault(size: Size): PhoneInputStyles {
  return useThemedStyles(({ colors, radius, fontFamily, sizeScale }): PhoneInputStyles => {
    const s = sizeScale(size);

    return {
      root: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          height: s.height,
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
          paddingHorizontal: s.paddingHorizontal * 0.75,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: s.gap * 0.5,
        },
      },
      countryButtonText: {
        default: {
          fontFamily,
          fontSize: s.fontSize,
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
          paddingHorizontal: s.paddingHorizontal,
          fontFamily,
          fontSize: s.fontSize,
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
          paddingVertical: s.paddingVertical * 0.75,
          paddingHorizontal: s.paddingHorizontal * 0.75,
          borderRadius: radius / 2,
          flexDirection: "row",
          alignItems: "center",
          gap: s.gap,
        },
        selected: {
          backgroundColor: colors.muted,
        },
      },
      pickerOptionText: {
        default: {
          fontFamily,
          fontSize: s.fontSize,
          color: colors.foreground,
        },
      },
      pickerSearch: {
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          paddingVertical: s.paddingVertical * 0.5,
          paddingHorizontal: s.paddingHorizontal * 0.75,
          fontFamily,
          fontSize: s.fontSize * 0.875,
          color: colors.foreground,
          marginBottom: 4,
          outlineWidth: 0,
        },
      },
    };
  });
}
