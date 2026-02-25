import { LocalStorageService } from "@/services/LocalStorageService";
import { ColorScheme, ComponentsConfig } from "@korsolutions/ui";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
} from "lucide-react-native";

export const componentsConfig: ComponentsConfig = {
  colorScheme: {
    storage: {
      set: (value) => {
        LocalStorageService.set("CURRENT_COLOR_SCHEME", value);
      },
      get: () => {
        const currentColorScheme = LocalStorageService.get(
          "CURRENT_COLOR_SCHEME",
        );
        if (!currentColorScheme) return null;
        return currentColorScheme as ColorScheme;
      },
    },
  },
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
