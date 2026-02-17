import React, { useMemo, useState } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { AvatarContext } from "../context";
import { AvatarVariants } from "../variants";

export interface AvatarRootProps {
  variant?: keyof typeof AvatarVariants;
  children: React.ReactNode;
  render?: (props: AvatarRootProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AvatarRoot(props: AvatarRootProps) {
  const variantStyles = AvatarVariants[props.variant || "default"]();
  const composedStyles = [variantStyles.root, props.style];

  const [imageLoaded, setImageLoaded] = useState(false);

  const contextValue: AvatarContext = useMemo(
    () => ({
      styles: variantStyles,
      imageLoaded,
      setImageLoaded,
    }),
    [variantStyles, imageLoaded],
  );

  const Component = props.render ?? View;
  return (
    <AvatarContext.Provider value={contextValue}>
      <Component {...props} style={composedStyles} />
    </AvatarContext.Provider>
  );
}
