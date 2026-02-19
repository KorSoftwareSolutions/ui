import React from "react";

export const getElementProp = <T extends React.ElementType>(
  element: React.ReactNode,
  propName: string,
): React.ComponentProps<T>[string] | undefined => {
  if (!React.isValidElement(element)) return undefined;
  if (!element.props) return undefined;
  if (typeof element.props !== "object") return undefined;
  if (!(propName in element.props)) return undefined;
  return (element.props as any)[propName];
};
