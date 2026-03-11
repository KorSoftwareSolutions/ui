import type { Size } from "../../../utils/size-scale";
import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type AlertDialogStyles } from "../types";

export const useAlertDialogVariantDefault = (size: Size): AlertDialogStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize, sizeScale }): AlertDialogStyles => {
      const s = sizeScale(size);

      return {
        overlay: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        },
        content: {
          backgroundColor: colors.background,
          borderRadius: radius,
          padding: 24,
          maxWidth: 400,
          width: "90%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
          borderWidth: 1,
          borderColor: colors.border,
          zIndex: 1000,
        },
        title: {
          fontSize: fontSize * 1.25,
          lineHeight: Math.round(fontSize * 1.25 * 1.25),
          fontWeight: "600",
          color: colors.foreground,
          fontFamily,
          marginBottom: 8,
        },
        description: {
          fontSize,
          color: colors.mutedForeground,
          fontFamily,
          lineHeight: Math.round(fontSize * 1.25),
        },
        footer: {
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: s.gap,
          marginTop: 24,
        },
        cancel: {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: radius,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        },
        cancelText: {
          color: colors.foreground,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          fontWeight: "500",
          fontFamily,
        },
        action: {
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
          borderRadius: radius,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        actionText: {
          color: colors.primaryForeground,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          fontWeight: "500",
          fontFamily,
        },
      };
    },
  );
};
