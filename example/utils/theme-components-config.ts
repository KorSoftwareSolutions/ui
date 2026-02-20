import { ComponentsConfig } from "@korsolutions/ui";
import {
  CheckIcon,
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
};
