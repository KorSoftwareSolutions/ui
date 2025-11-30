import { TextInput, TextInputProps } from "react-native";

export interface InputProps {
  defaultValue?: TextInputProps["defaultValue"];
  value?: TextInputProps["value"];
  onChange?: TextInputProps["onChangeText"];

  onFocus?: TextInputProps["onFocus"];
  onBlur?: TextInputProps["onBlur"];

  style?: TextInputProps["style"];
}

export function Input(props: InputProps) {
  return <TextInput {...props} onChange={undefined} onChangeText={props.onChange} />;
}
