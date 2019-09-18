import { Breakpoints } from "./sanitize";
import { fromBreakpointToMedia } from "./fromBreakpointToMedia";

export const mediaQueryBuilder = (breakpoints: Breakpoints) => (
  on = "",
  extraMediaQuery = "",
  strict?: boolean
) => {
  const filteredBreakpoints = on
    .split(" ")
    .map(breakpointName => breakpoints[breakpointName])
    .filter(Boolean);
  const mediaQuery = [
    ...filteredBreakpoints.map(breakpoint =>
      fromBreakpointToMedia(breakpoint, strict)
    ),
    extraMediaQuery
  ]
    .filter(Boolean)
    .join(",");
  return mediaQuery;
};
