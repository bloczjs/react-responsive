import { Breakpoints } from "./sanitize";
import { fromBreakpointToMedia } from "./fromBreakpointToMedia";

export const mediaQueryBuilder = (breakpoints: Breakpoints) => (on = "", strict?: boolean) => {
  if (!on) {
    console.error("You have to set either the breakpoints of the media query");
    return "";
  }
  const rawBreakpointNames = on.split(" ");
  const filteredBreakpoints = rawBreakpointNames.map(breakpointName => breakpoints[breakpointName]).filter(Boolean);
  const mediaQuery = filteredBreakpoints
    .map(breakpoint => fromBreakpointToMedia(breakpoint, strict))
    .filter(Boolean)
    .join(",");
  if (!mediaQuery) {
    const isUniqBreakpoint = rawBreakpointNames.length === 1;
    console.error(
      `"${rawBreakpointNames.join('", "')}" ${isUniqBreakpoint ? "is" : "are"}n't ${
        isUniqBreakpoint ? "a " : ""
      }valid breakpoint${isUniqBreakpoint ? "" : "s"}`,
    );
  }
  return mediaQuery;
};
