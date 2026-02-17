export type { PhoneInputState, PhoneInputStyles } from "./types";

import { CountryPicker } from "./components/country-picker";
import { PhoneInput as PhoneInputComponent } from "./components/phone-input";
import { PhoneInputRoot } from "./components/phone-input-root";

export const PhoneInput = {
  Root: PhoneInputRoot,
  CountryPicker,
  Input: PhoneInputComponent,
};
