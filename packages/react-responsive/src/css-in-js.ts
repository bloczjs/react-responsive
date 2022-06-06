import { CSSProperties } from "react";
import { Breakpoints } from "./sanitize";
import { fromBreakpointToMedia } from "./fromBreakpointToMedia";

type CSSinJSProperties =
  | CSSProperties
  | {
      [key: string]: CSSProperties;
    };

interface Points {
  [breakpoint: string]: CSSinJSProperties;
}

type CSSinJS = Record<string, CSSinJSProperties>;
export const toJSON =
  (breakpoints: Breakpoints) =>
  (points: Points): CSSinJS => {
    const css: CSSinJS = {};
    Object.keys(points).forEach((point) => {
      const breakpoint = breakpoints[point];
      if (!breakpoint) {
        throw new Error(`${point} is not a valid breakpoint\nValid breakpoints are: ${Object.keys(breakpoints)}`);
      }
      css[`@media ${fromBreakpointToMedia(breakpoint)}`] = points[point];
    });
    return css;
  };

const stringify = (object: CSSinJSProperties) => {
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

export const toCSS =
  (breakpoints: Breakpoints) =>
  (points: Points): string =>
    stringify(toJSON(breakpoints)(points));
