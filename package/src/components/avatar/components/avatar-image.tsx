import React from "react";
import { Image, type ImageProps, type ImageStyle, type StyleProp } from "react-native";
import { useAvatar } from "../context";

export interface AvatarImageProps {
  source: ImageProps["source"];
  style?: StyleProp<ImageStyle>;
}

export function AvatarImage(props: AvatarImageProps) {
  const avatar = useAvatar();
  const composedStyles = [avatar.styles?.image, props.style];

  return (
    <Image
      {...props}
      style={composedStyles}
      onLoad={() => avatar.setImageLoaded(true)}
      onError={() => avatar.setImageLoaded(false)}
    />
  );
}
