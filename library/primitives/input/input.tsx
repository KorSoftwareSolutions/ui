import { Text, TextInput, TextInputProps } from "react-native";

interface InputProps {
  defaultValue?: TextInputProps["defaultValue"];
  value?: TextInputProps["value"];
  onChange?: TextInputProps["onChangeText"];
  style?: TextInputProps["style"];
}

export function Input(props: InputProps) {
  return <TextInput defaultValue={props.defaultValue} value={props.value} onChangeText={props.onChange} style={props.style} />;
}
