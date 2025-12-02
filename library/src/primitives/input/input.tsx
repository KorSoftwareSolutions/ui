import { TextInput, TextInputProps } from "react-native";
import { InputStyles } from "./types";
import { calculateComposedStyles } from "@/utils/calculate-styles";

export type InputPrimitiveBaseProps = Omit<TextInputProps, "onChange"> & {
  onChange?: TextInputProps["onChangeText"];
};

export interface InputPrimitiveProps extends InputPrimitiveBaseProps {
  render?: (props: InputPrimitiveProps) => React.ReactNode;

  styles?: InputStyles;
}

export function InputPrimitive(props: InputPrimitiveProps) {
  const composedStyles = calculateComposedStyles(props.styles, "default", "root", props.style);
  return <TextInput {...props} onChange={undefined} onChangeText={props.onChange} style={composedStyles} />;
}
