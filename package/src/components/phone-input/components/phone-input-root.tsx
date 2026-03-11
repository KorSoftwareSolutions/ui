import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { COUNTRIES, type CountryCode } from "../../../data/countries";
import { usePhoneMask } from "../../../hooks/use-phone-mask";
import { useComponentConfig } from "../../../themes/provider";
import type { ViewRef } from "../../../types/element.types";
import { mergeStyles } from "../../../utils/calculate-styles";
import type { Size } from "../../../utils/size-scale";
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
  size?: Size;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (isDisabled: boolean, isFocused: boolean): PhoneInputState => {
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
  size = "md",
  style,
}: PhoneInputRootProps) {
  const variantStyles = PhoneInputVariants[variant](size);
  const componentConfig = useComponentConfig("phoneInput");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);
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
    mergedStyles.root?.default,
    mergedStyles.root?.[state],
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
        styles: mergedStyles,

        triggerRef,
      }) satisfies PhoneInputContext,
    [mergedStyles, state, phoneMask, isDisabled, value, isFocused],
  );

  return (
    <PhoneInputContext.Provider value={context}>
      <View ref={triggerRef} style={rootStyles}>
        {children}
      </View>
    </PhoneInputContext.Provider>
  );
}
