import { TabsList } from "./tabs-list";
import { TabsRoot } from "./tabs-root";
import { TabsTrigger } from "./tabs-trigger";
import { TabsTriggerText } from "./tabs-trigger-text";

export const TabsPrimitive = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  TriggerText: TabsTriggerText,
};

export type { TabsPrimitiveListProps } from "./tabs-list";
export type { TabsPrimitiveRootProps } from "./tabs-root";
export type { TabsPrimitiveTriggerProps } from "./tabs-trigger";
export type { TabsPrimitiveTriggerTextProps } from "./tabs-trigger-text";
export * from "./types";
