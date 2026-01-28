import type { PropsWithRequiredRender, SvgProps } from "@/types/props.types";
import React from "react";
import { useToast } from "../context";

export type ToastIconProps = SvgProps;

export function ToastIcon({ render: Component, ...props }: PropsWithRequiredRender<ToastIconProps>) {
  const toast = useToast();

  const composedProps = {
    ...toast.styles?.icon,
    ...props,
    style: [toast.styles?.icon?.style, props.style],
  };

  return <Component absoluteStrokeWidth {...composedProps} />;
}
