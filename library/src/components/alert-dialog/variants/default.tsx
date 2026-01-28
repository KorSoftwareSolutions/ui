import { type AlertDialogStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useAlertDialogVariantDefault = (): AlertDialogStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): AlertDialogStyles => ({
      overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
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
      },
      title: {
        fontSize: fontSize * 1.25,
        fontWeight: "600",
        color: colors.foreground,
        fontFamily,
        marginBottom: 8,
      },
      description: {
        fontSize,
        color: colors.mutedForeground,
        fontFamily,
        lineHeight: fontSize * 1.5,
      },
      footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 24,
      },
      cancel: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
      },
      cancelText: {
        color: colors.foreground,
        fontSize,
        fontWeight: "500",
        fontFamily,
      },
      action: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: radius,
        backgroundColor: colors.primary,
      },
      actionText: {
        color: colors.primaryForeground,
        fontSize,
        fontWeight: "500",
        fontFamily,
      },
    }),
  );
};
