import { useState, useCallback } from "react";

export type NumericMaskFormat = "currency" | "decimal" | "integer" | "percentage";

export interface UseNumericMaskOptions {
  format?: NumericMaskFormat;
  locale?: string;
  currency?: string;
  precision?: number;
  min?: number;
  max?: number;
  allowNegative?: boolean;
  onChange?: (value: number | null) => void;
}

export interface UseNumericMaskReturn {
  value: string;
  numericValue: number | null;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  keyboardType: "numeric" | "decimal-pad" | "number-pad";
  setValue: (value: number | null) => void;
}

export function useNumericMask({
  format = "decimal",
  locale = "en-US",
  currency = "USD",
  precision = 2,
  min,
  max,
  allowNegative = true,
  onChange,
}: UseNumericMaskOptions = {}): UseNumericMaskReturn {
  const [numericValue, setNumericValue] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Determine actual precision based on format
  const effectivePrecision = format === "integer" ? 0 : precision;

  const formatValue = useCallback(
    (num: number | null): string => {
      if (num === null || isNaN(num)) return "";

      switch (format) {
        case "currency":
          return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: effectivePrecision,
            maximumFractionDigits: effectivePrecision,
          }).format(num);

        case "percentage":
          return new Intl.NumberFormat(locale, {
            style: "percent",
            minimumFractionDigits: effectivePrecision,
            maximumFractionDigits: effectivePrecision,
          }).format(num / 100);

        case "integer":
          return new Intl.NumberFormat(locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(num);

        case "decimal":
        default:
          return new Intl.NumberFormat(locale, {
            minimumFractionDigits: effectivePrecision,
            maximumFractionDigits: effectivePrecision,
          }).format(num);
      }
    },
    [format, locale, currency, effectivePrecision]
  );

  const parseValue = useCallback(
    (text: string): number | null => {
      // Remove currency symbols, spaces, thousand separators, and percentage signs
      let cleaned = text.replace(/[^\d.-]/g, "");

      // Handle negative sign
      if (!allowNegative) {
        cleaned = cleaned.replace(/-/g, "");
      }

      const parsed = parseFloat(cleaned);

      if (isNaN(parsed) || cleaned === "" || cleaned === "-") return null;

      // Apply min/max constraints
      let constrained = parsed;
      if (min !== undefined && constrained < min) constrained = min;
      if (max !== undefined && constrained > max) constrained = max;

      return constrained;
    },
    [min, max, allowNegative]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      // When focused, validate input before allowing it
      if (isFocused) {
        // Remove formatting characters to get raw input
        let cleaned = text.replace(/[^\d.-]/g, "");

        // Validate negative sign
        if (!allowNegative && cleaned.includes("-")) {
          return;
        }

        // Ensure negative sign is only at the start
        if (allowNegative) {
          const negativeCount = (cleaned.match(/-/g) || []).length;
          if (negativeCount > 1 || (cleaned.includes("-") && cleaned.indexOf("-") !== 0)) {
            return;
          }
        }

        // Check decimal precision (skip for integer format)
        if (effectivePrecision >= 0) {
          const decimalIndex = cleaned.indexOf(".");
          if (decimalIndex !== -1) {
            const decimalPart = cleaned.substring(decimalIndex + 1);

            // Prevent typing more decimals than allowed precision
            if (decimalPart.length > effectivePrecision) {
              return;
            }
          }

          // Prevent multiple decimal points
          const decimalCount = (cleaned.match(/\./g) || []).length;
          if (decimalCount > 1) {
            return;
          }

          // Prevent decimal point for integer format
          if (format === "integer" && cleaned.includes(".")) {
            return;
          }
        }
      }

      setDisplayValue(text);
      const value = parseValue(text);
      setNumericValue(value);
      onChange?.(value);
    },
    [parseValue, onChange, isFocused, effectivePrecision, allowNegative, format]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (numericValue !== null) {
      setDisplayValue(formatValue(numericValue));
    } else {
      setDisplayValue("");
    }
  }, [numericValue, formatValue]);

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
          setDisplayValue(formatValue(value));
        }
      } else {
        setDisplayValue("");
      }
      onChange?.(value);
    },
    [isFocused, formatValue, onChange]
  );

  // Determine keyboard type based on format
  const keyboardType = format === "integer" ? (allowNegative ? ("numeric" as const) : ("number-pad" as const)) : ("decimal-pad" as const);

  return {
    value: displayValue,
    numericValue,
    onChangeText: handleChangeText,
    onBlur: handleBlur,
    onFocus: handleFocus,
    keyboardType,
    setValue,
  };
}
