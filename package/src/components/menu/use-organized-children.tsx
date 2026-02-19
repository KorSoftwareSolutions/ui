import React, { useMemo } from "react";
import { Text } from "react-native";
import { getElementProp } from "../../utils/element-utils";
import { Icon } from "../icon";
import { useMenu } from "./context";

export function useOrganizedChildren(children: React.ReactNode) {
  const menu = useMenu();

  const organizedChildren = useMemo(() => {
    if (typeof children === "string") {
      return <Text style={menu.styles?.itemText}>{children}</Text>;
    }
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        if (typeof child === "string") {
          return (
            <Text key={index} style={menu.styles?.itemText}>
              {child}
            </Text>
          );
        } else if (React.isValidElement(child) && child.type === Icon) {
          return React.cloneElement(child as React.ReactElement<any>, {
            key: child.key,
            ...menu.styles?.itemIcon,
            style: [
              menu.styles?.itemIcon?.style,
              getElementProp(child, "style"),
            ],
          });
        }
        return child;
      });
    }
    return children;
  }, [children, menu.styles?.itemIcon]);
  return organizedChildren;
}
