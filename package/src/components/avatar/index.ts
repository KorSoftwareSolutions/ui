import { AvatarFallback } from "./components/avatar-fallback";
import { AvatarImage } from "./components/avatar-image";
import { AvatarRoot } from "./components/avatar-root";

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
};

export type { AvatarFallbackProps } from "./components/avatar-fallback";
export type { AvatarImageProps } from "./components/avatar-image";
export type { AvatarRootProps } from "./components/avatar-root";
export type { AvatarStyles } from "./types";
