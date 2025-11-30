import { StyleProp, Text, TextStyle } from "react-native";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useSelect } from "./context";
import { useEffect } from "react";

export interface SelectOptionProps {
  children: string;
  value: string;

  style?: StyleProp<TextStyle>;

  render?: (props: SelectOptionProps) => React.ReactElement;
}

export function SelectOption(props: SelectOptionProps) {
  const select = useSelect();
  const composedStyles = calculateComposedStyles(select.styles, select.state, "option", props.style);

  useEffect(() => {
    select.setOptions((prev) => {
      if (prev.find((option) => option.value === props.value)) {
        return prev;
      }
      return [...prev, { value: props.value, label: props.children }];
    });
  }, [props.value, props.children]);

  const Component = props.render ?? Text;
  return (
    <Component
      value={props.value}
      onPress={() => {
        select.onChange?.(props.value);
        select.setIsOpen(false);
      }}
      style={composedStyles}
    >
      {props.children}
    </Component>
  );
}
