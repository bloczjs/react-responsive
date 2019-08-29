import { Breakpoint } from "./sanitize";

export const fromBreakpointToMedia = (
  breakpoint: Breakpoint,
  strict = false
) => {
  const out = [];
  let str;
  if (breakpoint[0] !== 0) {
    str = `${breakpoint[0]}${breakpoint[2]}`;
    if (strict) {
      str = `calc(${str} + 1px)`;
    }
    out.push(`(min-width:${str})`);
  }
  if (breakpoint[1] !== Infinity) {
    str = `${breakpoint[1]}${breakpoint[2]}`;
    if (strict) {
      str = `calc(${str} - 1px)`;
    }
    out.push(`(max-width:${str})`);
  }
  if (out.length === 0) {
    return "";
  }
  return out.join(" and ");
};
