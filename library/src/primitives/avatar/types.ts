import type { AvatarFallbackProps } from "./avatar-fallback";
import type { AvatarImageProps } from "./avatar-image";
import type { AvatarRootProps } from "./avatar-root";

export type AvatarStyles = {
  root?: AvatarRootProps["style"];
  image?: AvatarImageProps["style"];
  fallback?: AvatarFallbackProps["style"];
};
