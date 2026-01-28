import { TabsList } from "./components/tabs-list";
import { TabsRoot } from "./components/tabs-root";
import { TabsTrigger } from "./components/tabs-trigger";
import { TabsTriggerText } from "./components/tabs-trigger-text";

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  TriggerText: TabsTriggerText,
};

export type { TabsListProps } from "./components/tabs-list";
export type { TabsRootProps } from "./components/tabs-root";
export type { TabsTriggerProps } from "./components/tabs-trigger";
export type { TabsTriggerTextProps } from "./components/tabs-trigger-text";
export * from "./types";
