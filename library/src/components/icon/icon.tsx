import type { PropsWithRequiredRender, SvgProps } from "@/types/props.types";
import React from "react";
import { IconVariants } from "./variants";

export type IconProps = SvgProps & {
  variant?: keyof typeof IconVariants;
};

export function Icon({ render: Component, ...props }: PropsWithRequiredRender<IconProps>) {
  const variantProps = IconVariants[props.variant ?? "default"]();
  const composedProps: SvgProps = {
    ...variantProps,
    ...props,
    style: [variantProps.style, props.style],
    absoluteStrokeWidth: props.absoluteStrokeWidth ?? true,
  };

  return <Component {...composedProps} />;
}
