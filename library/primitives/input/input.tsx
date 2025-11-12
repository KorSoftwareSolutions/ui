import { Text, TextInput, TextInputProps } from "react-native";

interface InputProps {
  defaultValue?: TextInputProps["defaultValue"];
  value?: TextInputProps["value"];
  onChange?: TextInputProps["onChangeText"];
}

export function Input(props: InputProps) {
  return <TextInput defaultValue={props.defaultValue} value={props.value} onChangeText={props.onChange} />;
}
