import type { AvatarFallbackProps } from "./components/avatar-fallback";
import type { AvatarImageProps } from "./components/avatar-image";
import type { AvatarRootProps } from "./components/avatar-root";

export type AvatarStyles = {
  root?: AvatarRootProps["style"];
  image?: AvatarImageProps["style"];
  fallback?: AvatarFallbackProps["style"];
};
