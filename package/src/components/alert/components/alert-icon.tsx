import type { PropsWithRequiredRender, SvgProps } from "../../../types/props.types";
import React from "react";
import { useAlert } from "../context";

export type AlertIconProps = SvgProps;

export function AlertIcon({ render: Component, ...props }: PropsWithRequiredRender<AlertIconProps>) {
  const alert = useAlert();

  const composedProps = {
    ...alert.styles?.icon,
    ...props,
    style: [alert.styles?.icon?.style, props.style],
  };

  return <Component absoluteStrokeWidth {...composedProps} />;
}
