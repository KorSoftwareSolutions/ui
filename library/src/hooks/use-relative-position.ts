import * as React from "react";
import { useWindowDimensions, type DisplayMetrics, type LayoutRectangle } from "react-native";

interface Insets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

type UseRelativePositionArgs = Omit<GetContentStyleArgs, "triggerPosition" | "contentLayout" | "dimensions"> & {
  triggerPosition: LayoutPosition | null;
  contentLayout: LayoutRectangle | null;
};

export function useRelativePosition({
  align,
  avoidCollisions,
  triggerPosition,
  contentLayout,
  alignOffset,
  insets,
  sideOffset,
  side,
}: UseRelativePositionArgs) {
  const dimensions = useWindowDimensions();

  return React.useMemo(() => {
    if (!triggerPosition || !contentLayout) {
      return {
        position: "absolute",
        opacity: 0,
        top: dimensions.height,
        zIndex: -9999999,
      } as const;
    }
    return getContentStyle({
      align,
      avoidCollisions,
      contentLayout,
      side,
      triggerPosition,
      alignOffset,
      insets,
      sideOffset,
      dimensions,
    });
  }, [align, avoidCollisions, side, alignOffset, insets, triggerPosition, contentLayout, dimensions.width, dimensions.height]);
}

export interface LayoutPosition {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

interface GetPositionArgs {
  dimensions: DisplayMetrics;
  avoidCollisions: boolean;
  triggerPosition: LayoutPosition;
  contentLayout: LayoutRectangle;
  insets?: Insets;
}

interface GetSidePositionArgs extends GetPositionArgs {
  side: "top" | "bottom";
  sideOffset: number;
}

export const DEFAULT_LAYOUT: LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 };
export const DEFAULT_POSITION: LayoutPosition = { height: 0, width: 0, pageX: 0, pageY: 0 };

function getSidePosition({ side, triggerPosition, contentLayout, sideOffset, insets, avoidCollisions, dimensions }: GetSidePositionArgs) {
  const insetTop = insets?.top ?? 0;
  const insetBottom = insets?.bottom ?? 0;
  const positionTop = triggerPosition?.pageY - sideOffset - contentLayout.height;
  const positionBottom = triggerPosition.pageY + triggerPosition.height + sideOffset;

  if (!avoidCollisions) {
    return {
      top: side === "top" ? positionTop : positionBottom,
    };
  }

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

function getAlignPosition({ align, avoidCollisions, contentLayout, triggerPosition, alignOffset, insets, dimensions }: GetAlignPositionArgs) {
  const insetLeft = insets?.left ?? 0;
  const insetRight = insets?.right ?? 0;
  const maxContentWidth = dimensions.width - insetLeft - insetRight;

  const contentWidth = Math.min(contentLayout.width, maxContentWidth);

  let left = getLeftPosition(align, triggerPosition.pageX, triggerPosition.width, contentWidth, alignOffset, insetLeft, insetRight, dimensions);

  if (avoidCollisions) {
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

function getContentStyle({
  align,
  avoidCollisions,
  contentLayout,
  side,
  triggerPosition,
  alignOffset,
  insets,
  sideOffset,
  dimensions,
}: GetContentStyleArgs) {
  return Object.assign(
    { position: "absolute" } as const,
    getSidePosition({
      side,
      triggerPosition,
      contentLayout,
      sideOffset,
      insets,
      avoidCollisions,
      dimensions,
    }),
    getAlignPosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      dimensions,
    }),
  );
}
