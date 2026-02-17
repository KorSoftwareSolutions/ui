import type { EmptyDescriptionProps } from "./components/empty-description";
import type { EmptyMediaProps } from "./components/empty-media";
import type { EmptyRootProps } from "./components/empty-root";
import type { EmptyTitleProps } from "./components/empty-title";

export type EmptyStyles = {
  root?: EmptyRootProps["style"];
  media?: EmptyMediaProps["style"];
  title?: EmptyTitleProps["style"];
  description?: EmptyDescriptionProps["style"];
};
