import React from "react";
import { Linking, Text as RnText, StyleSheet, type TextProps as RnTextProps } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import { LinkVariants } from "./variants";

export type ExtendableProps = Omit<RnTextProps, "onPress" | "style">;

export type LinkStyles = RnTextProps["style"];

export type LinkProps = RnTextProps & {
  variant?: keyof typeof LinkVariants;
  style?: LinkStyles;
} & (
    | {
        href?: string;
      }
    | {
        onPress?: RnTextProps["onPress"];
      }
  );

export function Link(props: LinkProps) {
  const { style, onPress, variant = "default", ...rest } = props;
  const useVariantStyles = LinkVariants[variant];
  const config = useComponentConfig("link");
  const variantStyles = useVariantStyles();

  const handlePress: RnTextProps["onPress"] = async (e) => {
    if ("href" in props && props.href) {
      const supported = await Linking.canOpenURL(props.href);
      if (supported) {
        await Linking.openURL(props.href);
      }
    } else {
      onPress?.(e);
    }
  };

  const composedStyles = StyleSheet.flatten([variantStyles, config?.styles, style]);

  return <RnText {...rest} style={composedStyles} onPress={handlePress} />;
}
