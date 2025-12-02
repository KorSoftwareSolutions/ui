import { SelectStyles } from "@korsolutions/ui/primitives";

export const defaultSelectStyles: SelectStyles = {
  trigger: {
    default: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      paddingHorizontal: 12,
      paddingVertical: 8,
      minHeight: 48,
      justifyContent: "center",
    },
    disabled: {
      backgroundColor: "#F0F0F0",
    },
  },
  content: {
    default: {
      position: "absolute",
      top: 56,
      left: 0,
      right: 0,
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      maxHeight: 200,
      zIndex: 1000,
    },
  },
  option: {
    default: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  },
};
