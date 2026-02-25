import { ComponentsConfig } from "@korsolutions/ui";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
} from "lucide-react-native";

export const componentsConfig: ComponentsConfig = {
  toast: {
    icons: {
      success: CircleCheckIcon,
      danger: CircleXIcon,
      default: InfoIcon,
    },
  },
  menu: {
    selectionIcon: CheckIcon,
  },
  calendar: {
    prevIcon: ChevronLeftIcon,
    nextIcon: ChevronRightIcon,
  },
};
