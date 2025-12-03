import React from "react";
import { Text as RnText, TextProps as RnTextProps, Linking } from "react-native";
import { LinkVariants } from "./variants";

export interface LinkProps extends RnTextProps {
  href?: string;

  variant?: keyof typeof LinkVariants;
}

export function Link(props: LinkProps) {
  const useVariantStyles = LinkVariants[props.variant ?? "default"];
  const variantStyles = useVariantStyles();

  const handlePress: RnTextProps["onPress"] = async (e) => {
    if (props.href) {
      const supported = await Linking.canOpenURL(props.href);
      if (supported) {
        await Linking.openURL(props.href);
      }
    }
    props.onPress?.(e);
  };

  return <RnText {...props} style={variantStyles} onPress={handlePress} />;
}
