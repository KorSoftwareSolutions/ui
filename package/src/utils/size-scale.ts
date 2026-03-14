export type Size = "sm" | "md" | "lg";

interface SizeScaleValues {
  /** spacing * 1 | 1.5 | 2 */
  paddingVertical: number;
  /** spacing * 1.5 | 2 | 3 */
  paddingHorizontal: number;
  /** spacing * 0.75 | 1 | 1.25 */
  gap: number;
  /** fontSize * 0.875 | 1 | 1.125 */
  fontSize: number;
  /** fontSize * 1.25 (line height for text) */
  lineHeight: number;
  /** Equal to lineHeight (icons match text line height) */
  iconSize: number;
  /** 1.75 | 2 | 2.25 */
  strokeWidth: number;
  /** spacing * 4.5 | 6 | 7.5 */
  height: number;
}

const scales: Record<
  Size,
  { pv: number; ph: number; gap: number; fontScale: number; sw: number; h: number }
> = {
  sm: { pv: 1, ph: 1.5, gap: 0.75, fontScale: 0.875, sw: 1.75, h: 4.5 },
  md: { pv: 1.5, ph: 2, gap: 1, fontScale: 1, sw: 1.75, h: 6 },
  lg: { pv: 2, ph: 3, gap: 1.25, fontScale: 1.125, sw: 1.75, h: 7.5 },
};

export function getSizeScale(
  size: Size = "md",
  spacing: number,
  fontSize: number,
): SizeScaleValues {
  const s = scales[size] ?? scales.md;
  const scaledFontSize = fontSize * s.fontScale;
  const lineHeight = Math.round(scaledFontSize * 1.25);
  return {
    paddingVertical: spacing * s.pv,
    paddingHorizontal: spacing * s.ph,
    gap: spacing * s.gap,
    fontSize: scaledFontSize,
    lineHeight,
    iconSize: lineHeight,
    strokeWidth: s.sw,
    height: spacing * s.h,
  };
}
