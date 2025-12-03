import { AvatarPrimitive } from "@/primitives";
import React, { useState } from "react";
import { ImageSource } from "react-native";
import { AvatarVariants } from "./variants";

export interface AvatarProps {
  source?: ImageSource;
  fallback: string;

  variant?: keyof typeof AvatarVariants;
}

export function Avatar(props: AvatarProps) {
  const useVariantStyles = AvatarVariants[props.variant || "default"];
  const styles = useVariantStyles();
  const [imageError, setImageError] = useState(false);
  return (
    <AvatarPrimitive.Root styles={styles}>
      {props.source && <AvatarPrimitive.Image source={props.source} onError={() => setImageError(true)} />}
      {(!props.source || imageError) && <AvatarPrimitive.Fallback>{props.fallback}</AvatarPrimitive.Fallback>}
    </AvatarPrimitive.Root>
  );
}
