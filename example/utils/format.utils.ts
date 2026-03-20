import { parsePhoneNumberWithError } from "libphonenumber-js";

export function formatPhoneNumber(e164: string): string {
  try {
    return parsePhoneNumberWithError(e164).formatInternational();
  } catch {
    return e164;
  }
}
