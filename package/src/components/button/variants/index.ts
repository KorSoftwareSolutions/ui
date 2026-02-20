import { useButtonVariantDefault } from "./default";
import { useButtonVariantGhost } from "./ghost";
import { useButtonVariantSecondary } from "./secondary";

export const ButtonVariants = {
  default: useButtonVariantDefault,
  secondary: useButtonVariantSecondary,
  ghost: useButtonVariantGhost,
};
