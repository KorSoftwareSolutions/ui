import { FieldStyles, InputStyles, SelectStyles } from "@kor/ui";
import { defaultInputStyles } from "./input";
import { defaultSelectStyles } from "./select";

export const baseFieldStyles: FieldStyles<void> = {
  root: {
    default: {},
  },
  label: {
    default: {
      fontSize: 16,
      color: "#666",
      marginBottom: 4,
    },
  },
};

export const inputFieldStyles: FieldStyles<InputStyles> = {
  ...baseFieldStyles,
  control: {
    default: defaultInputStyles,
  },
};

export const selectFieldStyles: FieldStyles<SelectStyles> = {
  ...baseFieldStyles,
  control: {
    default: defaultSelectStyles,
  },
};
