import { StyleProp, View, ViewStyle } from "react-native";
import { FieldContext } from "./field-context";

interface FieldRootProps {
  required?: boolean;
  disabled?: boolean;
  error?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function FieldRoot(props: FieldRootProps) {
  return (
    <FieldContext.Provider
      value={{
        required: props.required,
        disabled: props.disabled,
        error: props.error,
      }}
    >
      <View style={props.style}>{props.children}</View>
    </FieldContext.Provider>
  );
}
