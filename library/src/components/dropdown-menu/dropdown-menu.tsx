import { DropdownMenuPrimitive } from "@/primitives";
import React from "react";
import { DropdownMenuVariants } from "./variants";
import { PressableProps } from "react-native";

type DropdownMenuOption =
  | {
      type: "button";
      label: string;
      onPress: () => void;
    }
  | {
      type: "divider";
    };

interface DropdownMenuProps {
  trigger: React.ReactElement<PressableProps>;
  options: DropdownMenuOption[];

  variant?: keyof typeof DropdownMenuVariants;
}

export function DropdownMenu(props: DropdownMenuProps) {
  const useVariantStyles = DropdownMenuVariants[props.variant || "default"];
  const styles = useVariantStyles();

  return (
    <DropdownMenuPrimitive.Root styles={styles}>
      <DropdownMenuPrimitive.Trigger>{props.trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Overlay>
          <DropdownMenuPrimitive.Content>
            {props.options.map((option) => {
              if (option.type === "button") {
                return (
                  <DropdownMenuPrimitive.Button onPress={option.onPress} key={option.label}>
                    {option.label}
                  </DropdownMenuPrimitive.Button>
                );
              } else if (option.type === "divider") {
                return <DropdownMenuPrimitive.Divider key={Math.random().toString()} />;
              }
            })}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Overlay>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
