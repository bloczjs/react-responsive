import type { MediaRange } from "./sanitize";

export function fromMediaRangeToMedia(
  mediaRange: MediaRange,
): string {
  const mediaList: string[] = [];
  const [minValue, maxValue, unit, direction] = mediaRange;

  // Min value
  if (minValue !== 0) {
    mediaList.push(`(min-${direction}:${minValue}${unit})`);
  }

  // Max value
  if (maxValue !== Infinity) {
    mediaList.push(`(max-${direction}:${maxValue}${unit})`);
  }

  return ` ${mediaList.join(" and ")}`;
}
