import { useState, useCallback } from "react";

export interface UseCurrencyMaskOptions {
  locale?: string;
  currency?: string;
  precision?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number | null) => void;
}

export interface UseCurrencyMaskReturn {
  value: string;
  numericValue: number | null;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  keyboardType: "decimal-pad";
  setValue: (value: number | null) => void;
}

export function useCurrencyMask({
  locale = "en-US",
  currency = "USD",
  precision = 2,
  min,
  max,
  onValueChange,
}: UseCurrencyMaskOptions = {}): UseCurrencyMaskReturn {
  const [numericValue, setNumericValue] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const formatCurrency = useCallback(
    (num: number | null): string => {
      if (num === null || isNaN(num)) return "";

      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(num);
    },
    [locale, currency, precision]
  );

  const parseCurrency = useCallback(
    (text: string): number | null => {
      // Remove currency symbols, spaces, and thousand separators
      const cleaned = text.replace(/[^\d.-]/g, "");
      const parsed = parseFloat(cleaned);

      if (isNaN(parsed) || cleaned === "") return null;

      // Apply min/max constraints
      let constrained = parsed;
      if (min !== undefined && constrained < min) constrained = min;
      if (max !== undefined && constrained > max) constrained = max;

      return constrained;
    },
    [min, max]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      // When focused, validate decimal precision before allowing input
      if (isFocused) {
        // Remove currency symbols and thousand separators to get raw input
        const cleaned = text.replace(/[^\d.-]/g, "");

        // Check if input has a decimal point
        const decimalIndex = cleaned.indexOf(".");
        if (decimalIndex !== -1) {
          const decimalPart = cleaned.substring(decimalIndex + 1);

          // Prevent typing more decimals than allowed precision
          if (decimalPart.length > precision) {
            return; // Don't update state if exceeds precision
          }
        }

        // Also prevent multiple decimal points
        const decimalCount = (cleaned.match(/\./g) || []).length;
        if (decimalCount > 1) {
          return;
        }
      }

      setDisplayValue(text);
      const value = parseCurrency(text);
      setNumericValue(value);
      onValueChange?.(value);
    },
    [parseCurrency, onValueChange, isFocused, precision]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (numericValue !== null) {
      setDisplayValue(formatCurrency(numericValue));
    } else {
      setDisplayValue("");
    }
  }, [numericValue, formatCurrency]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (numericValue !== null) {
      setDisplayValue(numericValue.toString());
    }
  }, [numericValue]);

  const setValue = useCallback(
    (value: number | null) => {
      setNumericValue(value);
      if (value !== null) {
        if (isFocused) {
          setDisplayValue(value.toString());
        } else {
          setDisplayValue(formatCurrency(value));
        }
      } else {
        setDisplayValue("");
      }
      onValueChange?.(value);
    },
    [isFocused, formatCurrency, onValueChange]
  );

  return {
    value: displayValue,
    numericValue,
    onChangeText: handleChangeText,
    onBlur: handleBlur,
    onFocus: handleFocus,
    keyboardType: "decimal-pad",
    setValue,
  };
}
