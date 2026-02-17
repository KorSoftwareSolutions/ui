import React from "react";
import { Image, type ImageSource, type ImageStyle, type StyleProp } from "react-native";
import { useAvatar } from "../context";

export interface AvatarImageProps {
  source: ImageSource;
  style?: StyleProp<ImageStyle>;
}

export function AvatarImage(props: AvatarImageProps) {
  const avatar = useAvatar();
  const composedStyles = [avatar.styles?.image, props.style];

  return <Image {...props} style={composedStyles} onLoad={() => avatar.setImageLoaded(true)} onError={() => avatar.setImageLoaded(false)} />;
}
