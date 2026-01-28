import { useNumericMask, type NumericMaskFormat } from "@/hooks/use-numeric-mask";
import React, { useEffect } from "react";
import { Input, type InputProps } from "./input";
import { InputVariants } from "./variants";

export interface NumericInputProps extends Omit<InputProps, "value" | "onChange" | "keyboardType"> {
  variant?: keyof typeof InputVariants;
  value?: number | null;
  onChange?: (value: number | null) => void;
  format?: NumericMaskFormat;
  locale?: string;
  currency?: string;
  precision?: number;
  min?: number;
  max?: number;
  allowNegative?: boolean;
}

export function NumericInput({
  value,
  onChange,
  format = "decimal",
  locale = "en-US",
  currency = "USD",
  precision = 2,
  min,
  max,
  allowNegative = true,
  variant = "default",
  onBlur,
  onFocus,
  ...props
}: NumericInputProps) {
  const numericMask = useNumericMask({
    format,
    locale,
    currency,
    precision,
    min,
    max,
    allowNegative,
    onChange,
  });

  useEffect(() => {
    if (value !== numericMask.numericValue) {
      numericMask.setValue(value ?? null);
    }
  }, [value]);

  const handleBlur = (e: any) => {
    numericMask.onBlur();
    onBlur?.(e);
  };

  const handleFocus = (e: any) => {
    numericMask.onFocus();
    onFocus?.(e);
  };

  return (
    <Input
      {...props}
      value={numericMask.value}
      onChange={numericMask.onChangeText}
      onBlur={handleBlur}
      onFocus={handleFocus}
      keyboardType={numericMask.keyboardType}
    />
  );
}
