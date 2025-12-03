import React from "react";
import { Image, ImageSource, ImageStyle, StyleProp } from "react-native";
import { useAvatar } from "./context";

export interface AvatarImageProps {
  source: ImageSource;
  onError: () => void;
  render?: (props: AvatarImageProps) => React.ReactNode;
  style?: StyleProp<ImageStyle>;
}

export function AvatarImage(props: AvatarImageProps) {
  const avatar = useAvatar();
  const composedStyles = [avatar.styles?.image, props.style];
  const Component = props.render ?? Image;
  return <Component {...props} style={composedStyles} />;
}
