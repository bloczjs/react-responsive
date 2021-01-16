import { Breakpoint } from "./sanitize";

export const fromBreakpointToMedia = (breakpoint: Breakpoint, strict = false): string => {
  const mediaList: string[] = [];
  const [minValue, maxValue, unit, direction] = breakpoint;
  let str;

  // Min value
  if (minValue !== 0) {
    str = `${minValue}${unit}`;
    if (strict) {
      str = `calc(${str} + 1px)`;
    }
    mediaList.push(`(min-${direction}:${str})`);
  }

  // Max value
  if (maxValue !== Infinity) {
    str = `${maxValue}${unit}`;
    if (strict) {
      str = `calc(${str} - 1px)`;
    }
    mediaList.push(`(max-${direction}:${str})`);
  }

  return " " + mediaList.join(" and ");
};
