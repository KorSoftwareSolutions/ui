import type { SafeAreaInsets } from "@/safe-area";
import { useMemo } from "react";
import { useWindowDimensions, type DisplayMetrics, type LayoutRectangle, type ViewStyle } from "react-native";

type UseRelativePositionArgs = Omit<GetContentStyleArgs, "triggerPosition" | "contentLayout" | "dimensions"> & {
  triggerPosition: LayoutPosition | null;
  contentLayout: LayoutRectangle | null;
};

export function useRelativePosition({
  align,
  triggerPosition,
  contentLayout,
  alignOffset,
  insets,
  sideOffset,
  preferredSide,
}: UseRelativePositionArgs): ViewStyle {
  const dimensions = useWindowDimensions();

  return useMemo(() => {
    if (!triggerPosition || !contentLayout) {
      return {
        position: "absolute",
        opacity: 0,
        top: dimensions.height,
        zIndex: -9999999,
      };
    }

    const style = getContentStyle({
      align,
      contentLayout,
      preferredSide,
      triggerPosition,
      alignOffset,
      insets,
      sideOffset,
      dimensions,
    });

    return style;
  }, [align, preferredSide, alignOffset, insets, triggerPosition, contentLayout, dimensions.width, dimensions.height, sideOffset]);
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
  insets?: SafeAreaInsets;
}

interface GetSidePositionArgs extends GetPositionArgs {
  preferredSide: "top" | "bottom";
  sideOffset: number;
}

export const DEFAULT_LAYOUT: LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 };
export const DEFAULT_POSITION: LayoutPosition = { height: 0, width: 0, pageX: 0, pageY: 0 };

interface GetSideArgs {
  preferredSide: "top" | "bottom";
  insetTop: number;
  insetBottom: number;
  positionTop: number;
  positionBottom: number;
  contentLayout: LayoutRectangle;
  dimensions: DisplayMetrics;
}

function getSide({ preferredSide, insetTop, insetBottom, positionTop, positionBottom, contentLayout, dimensions }: GetSideArgs) {
  if (preferredSide === "bottom") {
    const spaceBelow = dimensions.height - insetBottom - positionBottom;
    if (spaceBelow >= contentLayout.height) {
      return "bottom";
    }
    const spaceAbove = positionTop - insetTop;
    if (spaceAbove > spaceBelow) {
      return "top";
    }
    return "bottom";
  }
  const spaceAbove = positionTop - insetTop;
  if (spaceAbove >= contentLayout.height) {
    return "top";
  }
  const spaceBelow = dimensions.height - insetBottom - positionBottom;
  if (spaceBelow > spaceAbove) {
    return "bottom";
  }
  return "top";
}

function getSidePosition({ preferredSide, triggerPosition, contentLayout, sideOffset, insets, dimensions }: GetSidePositionArgs) {
  const insetTop = insets?.top ?? 0;
  const insetBottom = insets?.bottom ?? 0;
  const positionTop = triggerPosition?.pageY - sideOffset - contentLayout.height;
  const positionBottom = triggerPosition.pageY + triggerPosition.height + sideOffset;

  const side = getSide({
    preferredSide,
    insetTop,
    insetBottom,
    positionTop,
    positionBottom,
    contentLayout,
    dimensions,
  });

  if (side === "top") {
    return {
      top: Math.min(Math.max(insetTop, positionTop), dimensions.height - insetBottom - contentLayout.height),
    };
  }

  return {
    top: Math.min(dimensions.height - insetBottom - contentLayout.height, positionBottom),
  };
}

interface GetAlignPositionArgs extends GetPositionArgs {
  align: "start" | "center" | "end";
  alignOffset: number;
}

function getAlignPosition({ align, contentLayout, triggerPosition, alignOffset, insets, dimensions }: GetAlignPositionArgs) {
  const insetLeft = insets?.left ?? 0;
  const insetRight = insets?.right ?? 0;
  const maxContentWidth = dimensions.width - insetLeft - insetRight;

  const contentWidth = Math.min(contentLayout.width, maxContentWidth);

  let left = getLeftPosition(align, triggerPosition.pageX, triggerPosition.width, contentWidth, alignOffset, insetLeft, insetRight, dimensions);

  const doesCollide = left < insetLeft || left + contentWidth > dimensions.width - insetRight;
  if (doesCollide) {
    const spaceLeft = left - insetLeft;
    const spaceRight = dimensions.width - insetRight - (left + contentWidth);

    if (spaceLeft > spaceRight && spaceLeft >= contentWidth) {
      left = insetLeft;
    } else if (spaceRight >= contentWidth) {
      left = dimensions.width - insetRight - contentWidth;
    } else {
      const centeredPosition = Math.max(insetLeft, (dimensions.width - contentWidth - insetRight) / 2);
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
  insetLeft: number,
  insetRight: number,
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
  return Math.max(insetLeft, Math.min(left + alignOffset, dimensions.width - contentWidth - insetRight));
}

type GetContentStyleArgs = GetPositionArgs & GetSidePositionArgs & GetAlignPositionArgs;

function getContentStyle(args: GetContentStyleArgs): ViewStyle {
  return {
    position: "absolute",
    ...getSidePosition(args),
    ...getAlignPosition(args),
  };
}
