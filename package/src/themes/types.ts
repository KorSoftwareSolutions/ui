export type ColorScheme = "light" | "dark";

type Color = `hsl(${number}, ${number}%, ${number}%)`;

export interface Colors {
  background: Color;
  foreground: Color;
  primary: Color;
  primaryForeground: Color;
  secondary: Color;
  secondaryForeground: Color;
  muted: Color;
  mutedForeground: Color;
  border: Color;
  surface: Color;
  success: Color;
  warning: Color;
  danger: Color;
  info: Color;
}

export type Radius = number;
export type FontFamily = string;
export type LetterSpacing = number;
export type FontSize = number;

export interface ThemeAssets {
  colors: Record<ColorScheme, Colors>;
  radius: Radius;
  fontFamily: FontFamily;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
  spacing: number;
}

export type StorageClient<T> = {
  set: (value: T) => void;
  get: () => T | null;
};

import type { AlertDialogStyles } from "../components/alert-dialog/types";
import type { AlertStyles } from "../components/alert/types";
import type { AvatarStyles } from "../components/avatar/types";
import type { BadgeStyles } from "../components/badge/types";
import type { ButtonStyles } from "../components/button/types";
import type { CalendarStyles } from "../components/calendar/calendar/types";
import type { TimelineStyles } from "../components/calendar/timeline/types";
import type { WeekCalendarStyles } from "../components/calendar/week-calendar/types";
import type { CardStyles } from "../components/card/types";
import type { CheckboxStyles } from "../components/checkbox/types";
import type { ComboboxStyles } from "../components/combobox/types";
import type { EmptyStyles } from "../components/empty/types";
import type { FieldStyles } from "../components/field/types";
import type { IconButtonStyles } from "../components/icon-button/types";
import type { InputStyles } from "../components/input/types";
import type { LinkStyles } from "../components/link";
import type { MenuStyles } from "../components/menu/types";
import type { PhoneInputStyles } from "../components/phone-input/types";
import type { PopoverStyles } from "../components/popover/types";
import type { ProgressStyles } from "../components/progress/types";
import type { RadioGroupStyles } from "../components/radio-group/types";
import type { SelectStyles } from "../components/select/types";
import type { SeparatorStyles } from "../components/separator/types";
import type { SidebarStyles } from "../components/sidebar/types";
import type { SpinnerStyles } from "../components/spinner/types";
import type { TableStyles } from "../components/table/types";
import type { TabsStyles } from "../components/tabs/types";
import type { TextareaStyles } from "../components/textarea/types";
import type { ToastStyles } from "../components/toast/types";
import type { ToastVariants } from "../components/toast/variants";
import type { PressableStyles } from "../components/touchable/types";
import type { SvgProps } from "../types/props.types";

export interface ComponentsConfig {
  colorScheme?: {
    storage?: StorageClient<ColorScheme>;
  };
  alert?: {
    styles?: AlertStyles;
  };
  alertDialog?: {
    styles?: AlertDialogStyles;
  };
  avatar?: {
    styles?: AvatarStyles;
  };
  badge?: {
    styles?: BadgeStyles;
  };
  button?: {
    styles?: ButtonStyles;
  };
  calendar?: {
    prevIcon?: React.ComponentType<SvgProps>;
    nextIcon?: React.ComponentType<SvgProps>;
    styles?: CalendarStyles;
  };
  card?: {
    styles?: CardStyles;
  };
  checkbox?: {
    styles?: CheckboxStyles;
  };
  combobox?: {
    styles?: ComboboxStyles;
  };
  empty?: {
    styles?: EmptyStyles;
  };
  field?: {
    styles?: FieldStyles;
  };
  iconButton?: {
    styles?: IconButtonStyles;
  };
  input?: {
    styles?: InputStyles;
  };
  link?: {
    styles?: LinkStyles;
  };
  menu?: {
    selectionIcon?: React.ComponentType<SvgProps>;
    styles?: MenuStyles;
  };
  phoneInput?: {
    styles?: PhoneInputStyles;
  };
  popover?: {
    styles?: PopoverStyles;
  };
  progress?: {
    styles?: ProgressStyles;
  };
  radioGroup?: {
    styles?: RadioGroupStyles;
  };
  select?: {
    styles?: SelectStyles;
  };
  separator?: {
    styles?: SeparatorStyles;
  };
  sidebar?: {
    styles?: SidebarStyles;
  };
  spinner?: {
    styles?: SpinnerStyles;
  };
  table?: {
    styles?: TableStyles;
  };
  tabs?: {
    styles?: TabsStyles;
  };
  textarea?: {
    styles?: TextareaStyles;
  };
  timeline?: {
    styles?: TimelineStyles;
  };
  toast?: {
    icons?: Partial<Record<keyof typeof ToastVariants, React.ComponentType<SvgProps>>>;
    styles?: ToastStyles;
  };
  touchable?: {
    styles?: PressableStyles;
  };
  weekCalendar?: {
    styles?: WeekCalendarStyles;
  };
}
