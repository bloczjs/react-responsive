import { Breakpoint } from "./sanitize";

export const fromBreakpointToMedia = (
  breakpoint: Breakpoint,
  strict = false
) => {
  const mediaList: string[] = [];
  const [minValue, maxValue, unit] = breakpoint;
  let str;

  // Min value
  if (minValue !== 0) {
    str = `${minValue}${unit}`;
    if (strict) {
      str = `calc(${str} + 1px)`;
    }
    mediaList.push(`(min-width:${str})`);
  }

  // Max value
  if (maxValue !== Infinity) {
    str = `${maxValue}${unit}`;
    if (strict) {
      str = `calc(${str} - 1px)`;
    }
    mediaList.push(`(max-width:${str})`);
  }

  return " " + mediaList.join(" and ");
};
