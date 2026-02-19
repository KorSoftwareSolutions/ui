import React, { useState } from "react";
import {
  Keyboard,
  type LayoutRectangle,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { CountryData } from "../../../data/countries";
import {
  DEFAULT_LAYOUT,
  DEFAULT_POSITION,
  type LayoutPosition,
  useRelativePosition,
} from "../../../hooks/use-relative-position";
import { measureLayoutPosition } from "../../../utils/normalize-layout";
import { Portal } from "../../portal";
import { usePhoneInput } from "../context";

export function CountryPicker() {
  const { styles, state, phoneMask, isDisabled, triggerRef } = usePhoneInput();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerPosition, setTriggerPosition] =
    useState<LayoutPosition>(DEFAULT_POSITION);
  const [contentLayout, setContentLayout] =
    useState<LayoutRectangle>(DEFAULT_LAYOUT);

  const filteredCountries = searchQuery
    ? phoneMask.countries.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : phoneMask.countries;

  const onOpen = () => {
    if (isDisabled) return;
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }
    measureLayoutPosition(triggerRef.current, (layout) => {
      setTriggerPosition(layout);
      setSearchQuery("");
      setIsOpen(true);
    });
  };

  const onClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const onSelectCountry = (country: CountryData) => {
    phoneMask.setCountry(country.code);
    onClose();
  };

  const positionStyle = useRelativePosition({
    align: "start",
    triggerPosition,
    contentLayout,
    alignOffset: 0,
    preferredSide: "bottom",
    sideOffset: 2,
  });

  const countryButtonStyles = StyleSheet.flatten([
    styles.countryButton?.default,
    styles.countryButton?.[state],
  ]);
  const countryButtonTextStyles = StyleSheet.flatten([
    styles.countryButtonText?.default,
    styles.countryButtonText?.[state],
  ]);

  const overlayStyles = StyleSheet.flatten([
    styles.pickerOverlay?.default,
    styles.pickerOverlay?.[state],
  ]);
  const contentStyles = StyleSheet.flatten([
    styles.pickerContent?.default,
    styles.pickerContent?.[state],
  ]);
  const searchStyles = StyleSheet.flatten([
    styles.pickerSearch?.default,
    styles.pickerSearch?.[state],
  ]);

  return (
    <>
      <Pressable
        onPress={onOpen}
        disabled={isDisabled}
        style={countryButtonStyles}
      >
        <Text style={countryButtonTextStyles}>
          {phoneMask.country.flag} +{phoneMask.country.dialCode}
        </Text>
      </Pressable>
      {isOpen && (
        <Portal name="phone-input-country-picker">
          <Pressable
            onPress={onClose}
            style={[StyleSheet.absoluteFill, overlayStyles]}
          />
          <View
            style={[
              positionStyle,
              contentStyles,
              { width: triggerPosition.width },
            ]}
            onLayout={(e) => setContentLayout(e.nativeEvent.layout)}
            pointerEvents="box-none"
          >
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search countries..."
              autoFocus
              style={searchStyles}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
              {filteredCountries.map((country) => {
                const isSelected = country.code === phoneMask.country.code;
                const optionStyles = StyleSheet.flatten([
                  styles.pickerOption?.default,
                  isSelected && styles.pickerOption?.selected,
                ]);
                const optionTextStyles = StyleSheet.flatten([
                  styles.pickerOptionText?.default,
                  isSelected && styles.pickerOptionText?.selected,
                ]);

                return (
                  <Pressable
                    key={country.code}
                    onPress={() => onSelectCountry(country)}
                    style={optionStyles}
                  >
                    <Text style={optionTextStyles}>
                      {country.flag} {country.name} +{country.dialCode}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Portal>
      )}
    </>
  );
}
