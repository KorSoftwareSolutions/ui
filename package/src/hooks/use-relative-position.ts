import { useMemo } from "react";
import {
  Platform,
  useWindowDimensions,
  type DisplayMetrics,
  type LayoutRectangle,
  type ViewStyle,
} from "react-native";
import { usePortalOffset } from "../components/portal";
import { useSafeAreaInsets, type SafeAreaInsets } from "../safe-area";
import { useIsReactNavigationModal } from "./use-is-react-navigation-modal";

type UseRelativePositionArgs = Omit<
  GetContentStyleArgs,
  "dimensions" | "insets"
>;

type GetContentStyleArgs = GetPositionArgs &
  GetSidePositionArgs &
  GetAlignPositionArgs;

export function useRelativePosition({
  align,
  triggerPosition,
  contentLayout,
  alignOffset,
  sideOffset,
  preferredSide,
}: UseRelativePositionArgs): ViewStyle {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const portalOffset = usePortalOffset();

  const isReactNavigationModal = useIsReactNavigationModal();

  return useMemo(() => {
    const hasLayout =
      triggerPosition.width > 0 &&
      triggerPosition.height > 0 &&
      contentLayout.width > 0 &&
      contentLayout.height > 0 &&
      portalOffset.isLoaded;

    if (!hasLayout) {
      return {
        position: "absolute",
        opacity: 0,
        top: dimensions.height,
        zIndex: -9999999,
      };
    }

    // Adjust trigger position to account for the portal container's
    // offset from the window origin. measureInWindow returns window-relative
    // coordinates, but the portal content is positioned relative to its
    // container which may not be at the window origin (e.g. on Android
    // where the status bar offsets the view hierarchy).
    const adjustedTriggerPosition: LayoutPosition = {
      ...triggerPosition,
      pageX: triggerPosition.pageX - portalOffset.value.x,
      pageY: triggerPosition.pageY - portalOffset.value.y,
    };

    const args: GetContentStyleArgs = {
      align,
      contentLayout,
      preferredSide,
      triggerPosition: adjustedTriggerPosition,
      alignOffset,
      insets,
      sideOffset,
      dimensions,
    };

    const sidePosition = getSidePosition(args);
    const alignPosition = getAlignPosition(args);

    const style: ViewStyle = {
      position: "absolute",
      ...sidePosition,
      ...alignPosition,
      // Temporary fix to calculate portal content relative position correctly when rendered in a React Navigation modal.
      top: Platform.select({
        default: sidePosition.top,
        ios: isReactNavigationModal
          ? sidePosition.top + insets.top
          : sidePosition.top,
      }),
    };

    return style;
  }, [
    align,
    preferredSide,
    alignOffset,
    insets,
    triggerPosition,
    contentLayout,
    dimensions.width,
    dimensions.height,
    sideOffset,
    portalOffset,
    isReactNavigationModal,
  ]);
}

export interface LayoutPosition {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

interface GetPositionArgs {
  dimensions: DisplayMetrics;
  triggerPosition: LayoutPosition;
  contentLayout: LayoutRectangle;
  insets: SafeAreaInsets;
}

interface GetSidePositionArgs extends GetPositionArgs {
  preferredSide: "top" | "bottom";
  sideOffset: number;
}

export const DEFAULT_LAYOUT: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
export const DEFAULT_POSITION: LayoutPosition = {
  height: 0,
  width: 0,
  pageX: 0,
  pageY: 0,
};

interface GetSideArgs {
  preferredSide: "top" | "bottom";
  insets: SafeAreaInsets;
  positionTop: number;
  positionBottom: number;
  contentLayout: LayoutRectangle;
  dimensions: DisplayMetrics;
}

function getSide({
  preferredSide,
  insets,
  positionTop,
  positionBottom,
  contentLayout,
  dimensions,
}: GetSideArgs) {
  if (preferredSide === "bottom") {
    const spaceBelow = dimensions.height - insets.bottom - positionBottom;
    if (spaceBelow >= contentLayout.height) {
      return "bottom";
    }
    const spaceAbove = positionTop - insets.top;
    if (spaceAbove > spaceBelow) {
      return "top";
    }
    return "bottom";
  }
  const spaceAbove = positionTop - insets.top;
  if (spaceAbove >= contentLayout.height) {
    return "top";
  }
  const spaceBelow = dimensions.height - insets.bottom - positionBottom;
  if (spaceBelow > spaceAbove) {
    return "bottom";
  }
  return "top";
}

function getSidePosition({
  preferredSide,
  triggerPosition,
  contentLayout,
  sideOffset,
  insets,
  dimensions,
}: GetSidePositionArgs) {
  const positionTop =
    triggerPosition?.pageY - sideOffset - contentLayout.height;
  const positionBottom =
    triggerPosition.pageY + triggerPosition.height + sideOffset;

  const side = getSide({
    preferredSide,
    insets,
    positionTop,
    positionBottom,
    contentLayout,
    dimensions,
  });

  if (side === "top") {
    return {
      top: Math.min(
        Math.max(insets.top, positionTop),
        dimensions.height - insets.bottom - contentLayout.height,
      ),
    };
  }

  let top = Math.min(
    dimensions.height - insets.bottom - contentLayout.height,
    positionBottom,
  );

  return {
    top,
  };
}

interface GetAlignPositionArgs extends GetPositionArgs {
  align: "start" | "center" | "end";
  alignOffset: number;
}

function getAlignPosition({
  align,
  contentLayout,
  triggerPosition,
  alignOffset,
  insets,
  dimensions,
}: GetAlignPositionArgs) {
  const maxContentWidth = dimensions.width - insets.left - insets.right;

  const contentWidth = Math.min(contentLayout.width, maxContentWidth);

  let left = getLeftPosition(
    align,
    triggerPosition.pageX,
    triggerPosition.width,
    contentWidth,
    alignOffset,
    insets,
    dimensions,
  );

  const doesCollide =
    left < insets.left || left + contentWidth > dimensions.width - insets.right;
  if (doesCollide) {
    const spaceLeft = left - insets.left;
    const spaceRight = dimensions.width - insets.right - (left + contentWidth);

    if (spaceLeft > spaceRight && spaceLeft >= contentWidth) {
      left = insets.left;
    } else if (spaceRight >= contentWidth) {
      left = dimensions.width - insets.right - contentWidth;
    } else {
      const centeredPosition = Math.max(
        insets.left,
        (dimensions.width - contentWidth - insets.right) / 2,
      );
      left = centeredPosition;
    }
  }

  return { left, maxWidth: maxContentWidth };
}

function getLeftPosition(
  align: "start" | "center" | "end",
  triggerPageX: number,
  triggerWidth: number,
  contentWidth: number,
  alignOffset: number,
  insets: SafeAreaInsets,
  dimensions: DisplayMetrics,
) {
  let left = 0;
  if (align === "start") {
    left = triggerPageX;
  }
  if (align === "center") {
    left = triggerPageX + triggerWidth / 2 - contentWidth / 2;
  }
  if (align === "end") {
    left = triggerPageX + triggerWidth - contentWidth;
  }
  return Math.max(
    insets.left,
    Math.min(
      left + alignOffset,
      dimensions.width - contentWidth - insets.right,
    ),
  );
}
