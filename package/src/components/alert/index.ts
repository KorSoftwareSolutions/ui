import { AlertBody } from "./components/alert-body";
import { AlertDescription } from "./components/alert-description";
import { AlertIcon } from "./components/alert-icon";
import { AlertRoot } from "./components/alert-root";
import { AlertTitle } from "./components/alert-title";

export const Alert = {
  Root: AlertRoot,
  Icon: AlertIcon,
  Body: AlertBody,
  Title: AlertTitle,
  Description: AlertDescription,
};

export type { AlertBodyProps } from "./components/alert-body";
export type { AlertDescriptionProps } from "./components/alert-description";
export type { AlertIconProps } from "./components/alert-icon";
export type { AlertRootProps } from "./components/alert-root";
export type { AlertTitleProps } from "./components/alert-title";
export type { AlertStyles } from "./types";
