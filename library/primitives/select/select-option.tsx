import { StyleProp, View, ViewStyle } from "react-native";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useSelect } from "./context";

export interface SelectOptionProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  render?: (props: SelectOptionProps) => React.ReactElement;
}

export function SelectOption(props: SelectOptionProps) {
  const select = useSelect();
  const composedStyles = select.styles ? calculateComposedStyles(select.styles, select.state, "option", props.style) : props.style;

  const Component = props.render ?? View;
  return <Component style={composedStyles}>{props.children}</Component>;
}
