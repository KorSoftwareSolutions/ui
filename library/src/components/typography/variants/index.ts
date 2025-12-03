import { useTextVariantBodyLg } from "./body-lg";
import { useTextVariantBodyMd } from "./body-md";
import { useTextVariantBodySm } from "./body-sm";
import { useTextVariantHeadingLg } from "./heading-lg";
import { useTextVariantHeadingMd } from "./heading-md";
import { useTextVariantHeadingSm } from "./heading-sm";

export const TypographyVariants = {
  ["body-sm"]: useTextVariantBodySm,
  ["body-md"]: useTextVariantBodyMd,
  ["body-lg"]: useTextVariantBodyLg,
  ["heading-sm"]: useTextVariantHeadingSm,
  ["heading-md"]: useTextVariantHeadingMd,
  ["heading-lg"]: useTextVariantHeadingLg,
};
