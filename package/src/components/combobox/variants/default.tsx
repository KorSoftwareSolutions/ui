import { Platform } from "react-native";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type ComboboxStyles } from "../types";

export function useComboboxVariantDefault(): ComboboxStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): ComboboxStyles => ({
      root: {
        default: {},
        disabled: {},
      },
      trigger: {
        default: {
          placeholderTextColor: colors.mutedForeground,
          editable: true,
          style: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: radius,
            backgroundColor: colors.surface,
            justifyContent: "center",
            paddingVertical: 4,
            paddingHorizontal: 16,
            minHeight: 48,
            fontFamily,
            fontSize,
            color: colors.foreground,
            outlineWidth: 0,
            pointerEvents: "auto",
            ...Platform.select({
              web: {
                outline: "none",
              },
            }),
          },
        },
        focused: {
          style: {
            borderColor: colors.primary,
          },
        },
        disabled: {
          editable: false,
          style: {
            backgroundColor: colors.muted,
            color: colors.mutedForeground,
            pointerEvents: "none",
          },
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
          maxHeight: 256,
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
      empty: {
        default: {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontFamily,
          fontSize,
          color: colors.mutedForeground,
          textAlign: "center",
        },
        disabled: {},
      },
    }),
  );
}
