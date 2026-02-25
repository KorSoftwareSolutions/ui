import React, { useMemo } from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";
import { Icon, type IconProps } from "../components/icon";
import { getElementProp } from "../utils/element-utils";

export function useOrganizedChildren(
  children: React.ReactNode,
  textStyle: StyleProp<TextStyle> | undefined,
  iconProps: IconProps | undefined | null,
): React.ReactNode {
  const organizedChildren = useMemo(() => {
    if (typeof children === "string") {
      return <Text style={textStyle}>{children}</Text>;
    }
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        if (typeof child === "string") {
          return (
            <Text key={index} style={textStyle}>
              {child}
            </Text>
          );
        } else if (React.isValidElement(child) && child.type === Icon) {
          return React.cloneElement(child as React.ReactElement<any>, {
            key: child.key,
            ...iconProps,
            ...(child.props as object),
            style: [iconProps?.style, getElementProp(child, "style")],
          });
        }
        return child;
      });
    }
    return children;
  }, [children, iconProps, textStyle]);

  return organizedChildren;
}
