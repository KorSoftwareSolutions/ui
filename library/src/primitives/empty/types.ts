import type { EmptyDescriptionProps } from "./empty-description";
import type { EmptyMediaProps } from "./empty-media";
import type { EmptyRootProps } from "./empty-root";
import type { EmptyTitleProps } from "./empty-title";

export type EmptyStyles = {
  root?: EmptyRootProps["style"];
  media?: EmptyMediaProps["style"];
  title?: EmptyTitleProps["style"];
  description?: EmptyDescriptionProps["style"];
};
