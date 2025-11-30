export const calculateComposedStyles = <TStyle, State extends string | "default", Component extends string>(
  styles: Partial<Record<Component, Partial<Record<State, TStyle>>>> | null = {},
  state: State,
  component: Component,
  style?: TStyle
): TStyle[] => {
  const result: TStyle[] = [];
  const componentStyles = styles?.[component];
  if (componentStyles && "default" in componentStyles && componentStyles["default"]) {
    result.push(componentStyles["default"] as TStyle);
  }
  if (componentStyles?.[state]) {
    result.push(componentStyles[state]);
  }
  if (style) {
    result.push(style);
  }
  return result;
};
