export const hslaSetAlpha = (hsla: string, alpha: number): string => {
  const parts = hsla.replace(/^hsla?\(|\s+|\)$/g, "").split(",");
  if (parts.length < 3) {
    throw new Error("Invalid HSLA color format");
  }
  const h = parseInt(parts[0], 10);
  const s = parseInt(parts[1], 10);
  const l = parseInt(parts[2], 10);
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
};
