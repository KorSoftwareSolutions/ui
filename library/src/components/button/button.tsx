import React from "react";
import { ButtonPrimitive, ButtonPrimitiveRootProps } from "@/primitives";
import { ButtonVariants } from "./variants";

interface ButtonProps {
  children?: string;

  onPress?: ButtonPrimitiveRootProps["onPress"];
  onLayout?: ButtonPrimitiveRootProps["onLayout"];
  isDisabled?: boolean;
  isLoading?: boolean;

  variant?: keyof typeof ButtonVariants;
}

export function Button(props: ButtonProps) {
  const { children, variant = "default", ...rootProps } = props;
  const useVariantStyles = ButtonVariants[variant];
  const variantStyles = useVariantStyles();

  return (
    <ButtonPrimitive.Root {...rootProps} styles={variantStyles}>
      {props.isLoading && <ButtonPrimitive.Spinner />}
      <ButtonPrimitive.Label>{props.children}</ButtonPrimitive.Label>
    </ButtonPrimitive.Root>
  );
}
