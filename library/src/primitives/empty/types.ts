import { EmptyDescriptionProps } from "./empty-description";
import { EmptyMediaProps } from "./empty-media";
import { EmptyRootProps } from "./empty-root";
import { EmptyTitleProps } from "./empty-title";

export type EmptyStyles = {
  root?: EmptyRootProps["style"];
  media?: EmptyMediaProps["style"];
  title?: EmptyTitleProps["style"];
  description?: EmptyDescriptionProps["style"];
};
