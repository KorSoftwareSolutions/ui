import { PopoverPrimitive, usePopover } from "@/primitives";
import React, { forwardRef } from "react";
import { PopoverVariants } from "./variants";
import type { PopoverTriggerRef } from "@/primitives";
import { PressableProps } from "react-native";

interface PopoverChildrenProps {
  close: () => void;
}

export interface PopoverProps {
  children: ((props: PopoverChildrenProps) => React.ReactNode) | React.ReactNode;
  trigger: React.ReactElement<PressableProps>;
  closeOnOverlayPress?: boolean;

  variant?: keyof typeof PopoverVariants;
}

const PopoverContentComponent = (props: { children: PopoverProps["children"] }) => {
  const popover = usePopover();
  if (typeof props.children === "function") {
    return (
      <PopoverPrimitive.Content>
        {props.children({
          close: () => popover.setIsOpen(false),
        })}
      </PopoverPrimitive.Content>
    );
  }
  return <PopoverPrimitive.Content>{props.children}</PopoverPrimitive.Content>;
};

const PopoverComponent = forwardRef<PopoverTriggerRef, PopoverProps>((props, ref) => {
  const useVariantStyles = PopoverVariants[props.variant || "default"];
  const styles = useVariantStyles();

  return (
    <PopoverPrimitive.Root styles={styles}>
      <PopoverPrimitive.Trigger ref={ref}>{props.trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Overlay closeOnPress={props.closeOnOverlayPress}>
          <PopoverContentComponent>{props.children}</PopoverContentComponent>
        </PopoverPrimitive.Overlay>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});

PopoverComponent.displayName = "Popover";

export const Popover = PopoverComponent;
