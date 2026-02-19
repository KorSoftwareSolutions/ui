import { type MenuStyles } from "../..";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export const useMenuVariantDefault = (): MenuStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): MenuStyles => ({
      overlay: {},
      content: {
        overflow: "hidden",
        backgroundColor: colors.surface,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      },
      item: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          gap: 8,
        },
        hovered: {
          backgroundColor: colors.muted,
        },
      },
      itemText: {
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: colors.foreground,
      },
      itemIcon: {
        color: colors.foreground,
        size: fontSize * 1.25,
      },
      label: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontFamily: fontFamily,
        fontSize: fontSize * 0.75,
        fontWeight: "600",
        color: colors.mutedForeground,
      },
      separator: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 4,
        marginHorizontal: 8,
      },
      checkboxItem: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          gap: 8,
        },
        hovered: {
          backgroundColor: colors.muted,
        },
        disabled: {
          opacity: 0.5,
        },
      },
      checkboxIndicator: {
        fontSize: fontSize * 0.75,
        fontWeight: "bold",
        color: colors.foreground,
        width: fontSize,
        textAlign: "center",
        marginLeft: "auto",
      },
      radioItem: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          gap: 8,
        },
        hovered: {
          backgroundColor: colors.muted,
        },
        disabled: {
          opacity: 0.5,
        },
      },
      radioIndicator: {
        default: {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "transparent",
          marginLeft: "auto",
        },
        selected: {
          backgroundColor: colors.foreground,
        },
      },
      shortcut: {
        fontSize: fontSize * 0.75,
        fontFamily: fontFamily,
        color: colors.mutedForeground,
      },
    }),
  );
};
