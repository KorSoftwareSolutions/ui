import { AvatarFallbackProps } from "./avatar-fallback";
import { AvatarImageProps } from "./avatar-image";
import { AvatarRootProps } from "./avatar-root";

export type AvatarStyles = {
  root?: AvatarRootProps["style"];
  image?: AvatarImageProps["style"];
  fallback?: AvatarFallbackProps["style"];
};
