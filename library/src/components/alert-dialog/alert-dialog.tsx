import { AlertDialogPrimitive } from "@/primitives";
import type { PressableProps } from "react-native";
import { AlertDialogVariants } from "./variants";

interface AlertDialogProps {
  trigger: React.ReactElement<PressableProps>;
  title: string;
  description: string;
  actionLabel?: string;
  cancelLabel?: string;
  onAction?: () => void;
  onCancel?: () => void;
  variant?: keyof typeof AlertDialogVariants;
}

export function AlertDialog(props: AlertDialogProps) {
  const { title, description, actionLabel = "Continue", cancelLabel = "Cancel", onAction, onCancel, variant = "default" } = props;

  const useVariantStyles = AlertDialogVariants[variant];
  const variantStyles = useVariantStyles();

  return (
    <AlertDialogPrimitive.Root styles={variantStyles}>
      <AlertDialogPrimitive.Trigger>{props.trigger}</AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay />
        <AlertDialogPrimitive.Content>
          <AlertDialogPrimitive.Title>{title}</AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description>{description}</AlertDialogPrimitive.Description>
          <AlertDialogPrimitive.Footer>
            <AlertDialogPrimitive.Cancel onPress={onCancel}>{cancelLabel}</AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action onPress={onAction}>{actionLabel}</AlertDialogPrimitive.Action>
          </AlertDialogPrimitive.Footer>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
