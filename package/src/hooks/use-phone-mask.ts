import { useCallback, useEffect, useRef, useState } from "react";
import {
  type CountryData,
  COUNTRIES,
  getCountryByCode,
} from "../data/countries";

export interface UsePhoneMaskOptions {
  value?: string;
  defaultCountry?: string;
  onChange?: (e164Value: string) => void;
  onCountryChange?: (country: CountryData) => void;
  countries?: CountryData[];
}

export interface UsePhoneMaskReturn {
  displayValue: string;
  e164Value: string;
  country: CountryData;
  countries: CountryData[];
  onChangeText: (text: string) => void;
  setCountry: (countryCode: string) => void;
  setValue: (e164: string) => void;
  keyboardType: "phone-pad";
}

function stripToDigits(text: string): string {
  return text.replace(/\D/g, "");
}

function formatNational(digits: string, format: string): string {
  let result = "";
  let digitIndex = 0;
  for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
    if (format[i] === "#") {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += format[i];
    }
  }
  return result;
}

function toE164(dialCode: string, nationalDigits: string): string {
  return `+${dialCode}${nationalDigits}`;
}

function getMaxDigits(format: string): number {
  return format.split("").filter((c) => c === "#").length;
}

function parseE164(
  e164: string,
  countries: CountryData[],
): { country: CountryData; nationalDigits: string } | null {
  if (!e164.startsWith("+")) return null;
  const digits = e164.slice(1);

  const sorted = [...countries].sort(
    (a, b) => b.dialCode.length - a.dialCode.length,
  );

  for (const country of sorted) {
    if (digits.startsWith(country.dialCode)) {
      return {
        country,
        nationalDigits: digits.slice(country.dialCode.length),
      };
    }
  }
  return null;
}

export function usePhoneMask({
  value: controlledValue,
  defaultCountry = "US",
  onChange,
  onCountryChange,
  countries: customCountries,
}: UsePhoneMaskOptions = {}): UsePhoneMaskReturn {
  const availableCountries = customCountries ?? COUNTRIES;
  const isInternalChange = useRef(false);

  const [country, setCountryState] = useState<CountryData>(
    () => getCountryByCode(defaultCountry) ?? availableCountries[0]!,
  );
  const [nationalDigits, setNationalDigits] = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }

    if (controlledValue) {
      const parsed = parseE164(controlledValue, availableCountries);
      if (parsed) {
        setCountryState(parsed.country);
        setNationalDigits(parsed.nationalDigits);
        setDisplayValue(
          formatNational(parsed.nationalDigits, parsed.country.format),
        );
      }
    } else {
      setNationalDigits("");
      setDisplayValue("");
    }
  }, [controlledValue]);

  const onChangeText = useCallback(
    (text: string) => {
      const digits = stripToDigits(text);
      const maxDigits = getMaxDigits(country.format);
      const trimmed = digits.slice(0, maxDigits);

      setNationalDigits(trimmed);
      setDisplayValue(formatNational(trimmed, country.format));

      const e164 = trimmed.length > 0 ? toE164(country.dialCode, trimmed) : "";
      isInternalChange.current = true;
      onChange?.(e164);
    },
    [country, onChange],
  );

  const handleSetCountry = useCallback(
    (countryCode: string) => {
      const newCountry = availableCountries.find((c) => c.code === countryCode);
      if (!newCountry) return;

      setCountryState(newCountry);
      onCountryChange?.(newCountry);

      const maxDigits = getMaxDigits(newCountry.format);
      const trimmed = nationalDigits.slice(0, maxDigits);
      setNationalDigits(trimmed);
      setDisplayValue(formatNational(trimmed, newCountry.format));

      const e164 =
        trimmed.length > 0 ? toE164(newCountry.dialCode, trimmed) : "";
      isInternalChange.current = true;
      onChange?.(e164);
    },
    [nationalDigits, availableCountries, onChange, onCountryChange],
  );

  const setValue = useCallback(
    (e164: string) => {
      if (!e164) {
        setNationalDigits("");
        setDisplayValue("");
        isInternalChange.current = true;
        onChange?.("");
        return;
      }
      const parsed = parseE164(e164, availableCountries);
      if (parsed) {
        setCountryState(parsed.country);
        setNationalDigits(parsed.nationalDigits);
        setDisplayValue(
          formatNational(parsed.nationalDigits, parsed.country.format),
        );
        isInternalChange.current = true;
        onChange?.(e164);
      }
    },
    [availableCountries, onChange],
  );

  return {
    displayValue,
    e164Value:
      nationalDigits.length > 0 ? toE164(country.dialCode, nationalDigits) : "",
    country,
    countries: availableCountries,
    onChangeText,
    setCountry: handleSetCountry,
    setValue,
    keyboardType: "phone-pad",
  };
}
