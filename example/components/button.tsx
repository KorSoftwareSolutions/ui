import { ButtonStyles } from "@kor/ui";

export const defaultButtonStyles: ButtonStyles = {
  root: {
    default: {
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 4,
      alignItems: "center",
    },
    disabled: {
      backgroundColor: "#A0A0A0",
    },
  },
  label: {
    default: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    disabled: {
      color: "#E0E0E0",
    },
  },
};
