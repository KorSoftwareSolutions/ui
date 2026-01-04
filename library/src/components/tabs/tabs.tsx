import { TabsPrimitive } from "@/primitives";
import React, { useState } from "react";
import { TabsVariants } from "./variants";

export interface Tab<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface TabsProps<T> {
  tabs: Tab<T>[];
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  variant?: keyof typeof TabsVariants;
}

export function Tabs<T>(props: TabsProps<T>) {
  const { tabs, defaultValue, value: controlledValue, onChange, variant = "default" } = props;

  const initialValue = defaultValue ?? tabs[0]?.value ?? ("" as T);
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
  const value = controlledValue ?? uncontrolledValue;

  const handleValueChange = (newValue: T) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const useVariantStyles = TabsVariants[variant];
  const variantStyles = useVariantStyles();

  return (
    <TabsPrimitive.Root value={String(value)} onChange={(newValue) => handleValueChange(newValue as T)} styles={variantStyles}>
      <TabsPrimitive.List>
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger key={String(tab.value)} value={String(tab.value)} isDisabled={tab.disabled}>
            <TabsPrimitive.TriggerText value={String(tab.value)} isDisabled={tab.disabled}>
              {tab.label}
            </TabsPrimitive.TriggerText>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
