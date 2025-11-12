export interface FieldControlProps {
  value?: string;
  onChange?: (text: string) => void;
  render?: (props: FieldControlProps) => React.ReactNode;
}

export function FieldControl(props: FieldControlProps) {
  return props.render ? props.render(props) : null;
}
