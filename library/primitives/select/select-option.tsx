import { StyleProp, View, ViewStyle } from "react-native";

interface SelectOptionProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  render?: (props: SelectOptionProps) => React.ReactElement;
}

export function SelectOption(props: SelectOptionProps) {
  const Component = props.render ?? View;
  return <Component style={props.style}>{props.children}</Component>;
}
