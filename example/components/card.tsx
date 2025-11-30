import { CardStyles } from "@kor/ui";

export const defaultCardStyles: CardStyles = {
  root: {
    default: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#E0E0E0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      overflow: "hidden",
    },
  },
  header: {
    default: {
      padding: 24,
    },
  },
  title: {
    default: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333333",
    },
  },
  body: {
    default: {
      padding: 24,
      gap: 16,
    },
  },
  footer: {
    default: {
      padding: 24,
    },
  },
};
