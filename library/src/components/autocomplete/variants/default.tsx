import { type AutocompleteStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export function useAutocompleteVariantDefault(): AutocompleteStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): AutocompleteStyles => ({
      root: {
        default: {},
        focused: {},
        disabled: {},
      },
      input: {
        placeholderTextColor: colors.mutedForeground,
        selectionColor: colors.primary,
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          backgroundColor: colors.surface,
          paddingVertical: 12,
          paddingHorizontal: 16,
          outlineWidth: 0,
          fontFamily,
          fontSize,
          height: 48,
          color: colors.foreground,
        },
        focused: {
          borderColor: colors.primary,
        },
        disabled: {
          color: colors.mutedForeground,
          backgroundColor: colors.muted,
        },
      },
      overlay: {
        default: {},
        focused: {},
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
          maxHeight: 300,
        },
        focused: {},
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
        focused: {},
        disabled: {},
      },
    })
  );
}
