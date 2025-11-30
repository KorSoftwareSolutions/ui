import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";
import { InputStyles } from "./types";
import { calculateComposedStyles } from "../../utils/calculate-styles";

export interface InputProps {
  defaultValue?: TextInputProps["defaultValue"];
  value: string | null;
  onChange: (value: string) => void;

  onFocus?: TextInputProps["onFocus"];
  onBlur?: TextInputProps["onBlur"];

  style?: StyleProp<TextStyle>;
  styles?: InputStyles;
}

export function Input(props: InputProps) {
  const composedStyles = calculateComposedStyles(props.styles, "default", "root", props.style);
  return <TextInput {...props} value={props.value ?? ""} onChange={undefined} onChangeText={props.onChange} style={composedStyles} />;
}
