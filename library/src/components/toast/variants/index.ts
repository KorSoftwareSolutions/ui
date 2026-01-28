import { useToastVariantDefault } from "./default";
import { useToastVariantSuccess } from "./success";
import { useToastVariantDanger } from "./danger";

export const ToastVariants = {
  default: useToastVariantDefault,
  success: useToastVariantSuccess,
  danger: useToastVariantDanger,
};
