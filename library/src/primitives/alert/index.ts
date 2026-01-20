import { AlertBody } from "./alert-body";
import { AlertDescription } from "./alert-description";
import { AlertIcon } from "./alert-icon";
import { AlertRoot } from "./alert-root";
import { AlertTitle } from "./alert-title";

export const Alert = {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Description: AlertDescription,
};

export type { AlertBodyProps } from "./alert-body";
export type { AlertDescriptionProps } from "./alert-description";
export type { AlertIconProps } from "./alert-icon";
export type { AlertRootProps } from "./alert-root";
export type { AlertTitleProps } from "./alert-title";
export type { AlertStyles } from "./types";
