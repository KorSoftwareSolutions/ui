import React, { useEffect } from "react";
import { Input } from "./input";
import { InputPrimitiveBaseProps } from "@/primitives";
import { useNumericMask, NumericMaskFormat } from "@/hooks/use-numeric-mask";

export interface NumericInputProps extends Omit<InputPrimitiveBaseProps, "value" | "onChange" | "keyboardType"> {
  variant?: "default";
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

  // Sync external value changes with internal state
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
      variant={variant}
      value={numericMask.value}
      onChange={numericMask.onChangeText}
      onBlur={handleBlur}
      onFocus={handleFocus}
      keyboardType={numericMask.keyboardType}
    />
  );
}
