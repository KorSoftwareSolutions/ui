import type { CountryData } from "../../data/countries";
import { usePhoneMask } from "../../hooks/use-phone-mask";
import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition, useRelativePosition } from "../../hooks/use-relative-position";
import type { ViewRef } from "../../types/element.types";
import { measureLayoutPosition } from "../../utils/normalize-layout";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  type LayoutRectangle,
  Platform,
  Pressable,
  ScrollView,
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewStyle,
} from "react-native";
import { Portal } from "../portal";
import type { PhoneInputState } from "./types";
import { PhoneInputVariants } from "./variants";

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
  countries?: CountryData[];
  placeholder?: string;
  isDisabled?: boolean;
  variant?: keyof typeof PhoneInputVariants;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (isDisabled: boolean, isFocused: boolean): PhoneInputState => {
  if (isDisabled) return "disabled";
  if (isFocused) return "focused";
  return "default";
};

export function PhoneInput({
  value,
  onChange,
  defaultCountry = "US",
  countries,
  placeholder,
  isDisabled = false,
  variant = "default",
  style,
}: PhoneInputProps) {
  const variantStyles = PhoneInputVariants[variant]();
  const [isFocused, setIsFocused] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const triggerRef = useRef<ViewRef>(null);

  const state = calculateState(isDisabled, isFocused);

  const phoneMask = usePhoneMask({
    value,
    defaultCountry,
    onChange,
    countries,
  });

  const rootStyles = StyleSheet.flatten([variantStyles.root?.default, variantStyles.root?.[state], style]);
  const countryButtonStyles = StyleSheet.flatten([variantStyles.countryButton?.default, variantStyles.countryButton?.[state]]);
  const countryButtonTextStyles = StyleSheet.flatten([variantStyles.countryButtonText?.default, variantStyles.countryButtonText?.[state]]);
  const separatorStyles = StyleSheet.flatten([variantStyles.separator?.default, variantStyles.separator?.[state]]);
  const inputStyles = StyleSheet.flatten([variantStyles.input?.default, variantStyles.input?.[state]]);

  const openPicker = () => {
    if (isDisabled) return;
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }
    measureLayoutPosition(triggerRef.current, (layout) => {
      setTriggerPosition(layout);
      setSearchQuery("");
      setIsPickerOpen(true);
    });
  };

  const closePicker = () => {
    setIsPickerOpen(false);
    setSearchQuery("");
  };

  const selectCountry = (country: CountryData) => {
    phoneMask.setCountry(country.code);
    closePicker();
  };

  const filteredCountries = searchQuery
    ? phoneMask.countries.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : phoneMask.countries;

  return (
    <>
      <View ref={triggerRef} style={rootStyles}>
        <Pressable onPress={openPicker} disabled={isDisabled} style={countryButtonStyles}>
          <Text style={countryButtonTextStyles}>
            {phoneMask.country.flag} +{phoneMask.country.dialCode}
          </Text>
        </Pressable>
        <View style={separatorStyles} />
        <TextInput
          value={phoneMask.displayValue}
          onChangeText={phoneMask.onChangeText}
          keyboardType={phoneMask.keyboardType}
          placeholder={placeholder}
          placeholderTextColor={StyleSheet.flatten(variantStyles.countryButtonText?.disabled)?.color}
          readOnly={isDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyles}
        />
      </View>

      {isPickerOpen && (
        <CountryPicker
          countries={filteredCountries}
          selectedCode={phoneMask.country.code}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelect={selectCountry}
          onClose={closePicker}
          triggerPosition={triggerPosition}
          contentLayout={contentLayout}
          onContentLayout={setContentLayout}
          variantStyles={variantStyles}
          state={state}
        />
      )}
    </>
  );
}

interface CountryPickerProps {
  countries: CountryData[];
  selectedCode: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelect: (country: CountryData) => void;
  onClose: () => void;
  triggerPosition: LayoutPosition;
  contentLayout: LayoutRectangle;
  onContentLayout: (layout: LayoutRectangle) => void;
  variantStyles: ReturnType<(typeof PhoneInputVariants)["default"]>;
  state: PhoneInputState;
}

function CountryPicker({
  countries,
  selectedCode,
  searchQuery,
  onSearchChange,
  onSelect,
  onClose,
  triggerPosition,
  contentLayout,
  onContentLayout,
  variantStyles,
  state,
}: CountryPickerProps) {
  const positionStyle = useRelativePosition({
    align: "start",
    triggerPosition,
    contentLayout,
    alignOffset: 0,
    preferredSide: "bottom",
    sideOffset: 4,
  });

  const overlayStyles = StyleSheet.flatten([variantStyles.pickerOverlay?.default, variantStyles.pickerOverlay?.[state]]);
  const contentStyles = StyleSheet.flatten([variantStyles.pickerContent?.default, variantStyles.pickerContent?.[state]]);
  const searchStyles = StyleSheet.flatten([variantStyles.pickerSearch?.default, variantStyles.pickerSearch?.[state]]);

  return (
    <Portal name="phone-input-country-picker">
      <Pressable onPress={onClose} style={[StyleSheet.absoluteFill, overlayStyles]} />
      <View
        style={[positionStyle, contentStyles, { width: triggerPosition.width }]}
        onLayout={(e) => onContentLayout(e.nativeEvent.layout)}
        pointerEvents="box-none"
      >
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search countries..."
          autoFocus
          style={searchStyles}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          {countries.map((country) => {
            const isSelected = country.code === selectedCode;
            const optionStyles = StyleSheet.flatten([
              variantStyles.pickerOption?.default,
              isSelected && variantStyles.pickerOption?.selected,
            ]);
            const optionTextStyles = StyleSheet.flatten([
              variantStyles.pickerOptionText?.default,
              isSelected && variantStyles.pickerOptionText?.selected,
            ]);

            return (
              <Pressable key={country.code} onPress={() => onSelect(country)} style={optionStyles}>
                <Text style={optionTextStyles}>
                  {country.flag} {country.name} +{country.dialCode}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </Portal>
  );
}
