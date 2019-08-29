import { Breakpoints } from "./sanitize";
import { fromBreakpointToMedia } from "./fromBreakpointToMedia";

export const toMediaQuery = (breakpoints: Breakpoints) => (
  on: string = "",
  extraMediaQuery: string = "",
  strict?: boolean
) => {
  const filteredBreakpoints = on
    .split(" ")
    .map(breakpoint => breakpoints[breakpoint])
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
