import React from "react";
import { ButtonPrimitive } from "@/primitives";
import { ButtonVariants } from "./variants";

interface ButtonProps {
  onPress?: () => void;
  children?: string;
  isDisabled?: boolean;
  isLoading?: boolean;

  variant?: keyof typeof ButtonVariants;
}

export function Button(props: ButtonProps) {
  const useVariantStyles = props.variant ? ButtonVariants[props.variant] : ButtonVariants["default"];
  const variantStyles = useVariantStyles();

  return (
    <ButtonPrimitive.Root onPress={props.onPress} isDisabled={props.isDisabled} isLoading={props.isLoading} styles={variantStyles}>
      {props.isLoading && <ButtonPrimitive.Spinner />}
      <ButtonPrimitive.Label>{props.children}</ButtonPrimitive.Label>
    </ButtonPrimitive.Root>
  );
}
