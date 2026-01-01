export const hslaSetAlpha = (hsla: string, alpha: number): string => {
  const parts = hsla.replace(/^hsla?\(|\s+|\)$/g, "").split(",");
  if (parts[0] === undefined) throw new Error("Invalid HSLA color format");
  if (parts[1] === undefined) throw new Error("Invalid HSLA color format");
  if (parts[2] === undefined) throw new Error("Invalid HSLA color format");
  const h = parseInt(parts[0], 10);
  const s = parseInt(parts[1], 10);
  const l = parseInt(parts[2], 10);
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
};

export const hslaSetLightness = (hsla: string, lightness: number): string => {
  const parts = hsla.replace(/^hsla?\(|\s+|\)$/g, "").split(",");
  if (parts[0] === undefined) throw new Error("Invalid HSLA color format");
  if (parts[1] === undefined) throw new Error("Invalid HSLA color format");
  const h = parseInt(parts[0], 10);
  const s = parseInt(parts[1], 10);
  return `hsla(${h}, ${s}%, ${lightness}%, ${parts[3] ? parseFloat(parts[3]) : 1})`;
};

export const hslaGetLightness = (hsla: string): number => {
  const parts = hsla.replace(/^hsla?\(|\s+|\)$/g, "").split(",");
  if (parts[2] === undefined) throw new Error("Invalid HSLA color format");
  return parseInt(parts[2], 10);
};

export const hslaSetRelativeLightness = (hsla: string, delta: number): string => {
  const currentLightness = hslaGetLightness(hsla);
  let newLightness = currentLightness + delta;
  if (newLightness > 100) newLightness = 100;
  if (newLightness < 0) newLightness = 0;
  return hslaSetLightness(hsla, newLightness);
};
