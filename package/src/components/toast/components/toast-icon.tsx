import React from "react";
import type {
  PropsWithRequiredRender,
  SvgProps,
} from "../../../types/props.types";
import { useToast } from "../context";

export type ToastIconProps = SvgProps;

export function ToastIcon({
  render: Component,
  ...props
}: PropsWithRequiredRender<SvgProps>) {
  const toast = useToast();

  const composedProps = {
    ...toast.styles?.icon,
    ...props,
    style: [toast.styles?.icon?.style, props.style],
  };

  return <Component absoluteStrokeWidth {...composedProps} />;
}
