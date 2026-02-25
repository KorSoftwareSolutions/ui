import { Href } from "expo-router";

export interface ComponentRoute {
  title: string;
  href: Href;
}

export const COMPONENTS: ComponentRoute[] = [
  {
    title: "Alert Dialog",
    href: "/components/alert-dialog",
  },
  {
    title: "Alert",
    href: "/components/alert",
  },
  {
    title: "Avatar",
    href: "/components/avatar",
  },
  {
    title: "Badge",
    href: "/components/badge",
  },
  {
    title: "Button",
    href: "/components/button",
  },
  {
    title: "Calendar",
    href: "/components/calendar",
  },
  {
    title: "Card",
    href: "/components/card",
  },
  {
    title: "Checkbox",
    href: "/components/checkbox",
  },
  {
    title: "Combobox",
    href: "/components/combobox",
  },
  {
    title: "Icon",
    href: "/components/icon",
  },
  {
    title: "Icon Button",
    href: "/components/icon-button",
  },
  {
    title: "Input",
    href: "/components/input",
  },
  {
    title: "Menu",
    href: "/components/menu",
  },
  {
    title: "Select",
    href: "/components/select",
  },
  {
    title: "Separator",
    href: "/components/separator",
  },
  {
    title: "Spinner",
    href: "/components/spinner",
  },
  {
    title: "Field",
    href: "/components/field",
  },
  {
    title: "Typography",
    href: "/components/typography",
  },
  {
    title: "Empty",
    href: "/components/empty",
  },
  {
    title: "Toast",
    href: "/components/toast",
  },
  {
    title: "Textarea",
    href: "/components/textarea",
  },
  {
    title: "Popover",
    href: "/components/popover",
  },
  {
    title: "Progress",
    href: "/components/progress",
  },
  {
    title: "Radio Group",
    href: "/components/radio-group",
  },
  {
    title: "Tabs",
    href: "/components/tabs",
  },
  {
    title: "Touchable",
    href: "/components/touchable",
  },
];
