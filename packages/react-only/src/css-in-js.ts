import { CSSProperties } from "react";
import { Breakpoints } from "./sanitize";
import { fromBreakpointToMedia } from "./fromBreakpointToMedia";

type CSSinJS =
  | CSSProperties
  | {
      [key: string]: CSSProperties;
    };

interface Points {
  [breakpoint: string]: CSSinJS;
}

export const toJSON = (breakpoints: Breakpoints) => (points: Points) => {
  const css: Record<string, CSSinJS> = {};
  Object.keys(points).forEach((point) => {
    const breakpoint = breakpoints[point];
    if (!breakpoint) {
      throw new Error(`${point} is not a valid breakpoint\nValid breakpoints are: ${Object.keys(breakpoints)}`);
    }
    css[`@media ${fromBreakpointToMedia(breakpoint)}`] = points[point];
  });
  return css;
};

const stringify = (object: CSSinJS) => {
  let string = "";
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value !== "object") {
      string += `${key}: ${value};\n`;
      return;
    }
    string += `${key} {\n${stringify(value)}}\n`;
  });
  return string;
};

export const toCSS = (breakpoints: Breakpoints) => (points: Points) => stringify(toJSON(breakpoints)(points));
