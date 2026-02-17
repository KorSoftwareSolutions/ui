import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { COUNTRIES, type CountryCode } from "../../../data/countries";
import { usePhoneMask } from "../../../hooks/use-phone-mask";
import type { ViewRef } from "../../../types/element.types";
import { PhoneInputContext } from "../context";
import type { PhoneInputState } from "../types";
import { PhoneInputVariants } from "../variants";

export interface PhoneInputRootProps {
  children?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
  countryCodes?: CountryCode[];
  isDisabled?: boolean;
  variant?: keyof typeof PhoneInputVariants;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (
  isDisabled: boolean,
  isFocused: boolean,
): PhoneInputState => {
  if (isDisabled) return "disabled";
  if (isFocused) return "focused";
  return "default";
};

export function PhoneInputRoot({
  children,
  value,
  onChange,
  defaultCountry = "US",
  countryCodes = ["US"],
  isDisabled = false,
  variant = "default",
  style,
}: PhoneInputRootProps) {
  const variantStyles = PhoneInputVariants[variant]();
  const [isFocused, setIsFocused] = useState(false);
  const triggerRef = useRef<ViewRef>(null);

  const state = calculateState(isDisabled, isFocused);

  const countries = COUNTRIES.filter((c) => countryCodes.includes(c.code));

  const phoneMask = usePhoneMask({
    value,
    defaultCountry,
    onChange,
    countries,
  });

  const rootStyles = StyleSheet.flatten([
    variantStyles.root?.default,
    variantStyles.root?.[state],
    style,
  ]);

  const context = useMemo(
    () =>
      ({
        value,
        onChange,
        isFocused,
        setIsFocused,
        state,
        phoneMask,
        isDisabled,
        styles: variantStyles,
        triggerRef,
      }) satisfies PhoneInputContext,
    [variantStyles, state, phoneMask, isDisabled, value, isFocused],
  );

  return (
    <PhoneInputContext.Provider value={context}>
      <View ref={triggerRef} style={rootStyles}>
        {children}
      </View>
    </PhoneInputContext.Provider>
  );
}
