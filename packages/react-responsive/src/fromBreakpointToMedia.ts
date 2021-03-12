import { Breakpoint } from "./sanitize";

export const fromBreakpointToMedia = (breakpoint: Breakpoint): string => {
  const mediaList: string[] = [];
  const [minValue, maxValue, unit, direction] = breakpoint;
  let str;

  // Min value
  if (minValue !== 0) {
    str = `${minValue}${unit}`;
    mediaList.push(`(min-${direction}:${str})`);
  }

  // Max value
  if (maxValue !== Infinity) {
    str = `${maxValue}${unit}`;
    mediaList.push(`(max-${direction}:${str})`);
  }

  return " " + mediaList.join(" and ");
};
