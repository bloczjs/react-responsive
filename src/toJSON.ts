import BreakpointsProvider from "./BreakpointsProvider";
import fromBreakpointToMedia from "./fromBreakpointToMedia";

export type Point = {
  [key: string]: string;
};

export type Points = {
  [key: string]: Point | string;
};

export type CSSinJS = Points;

const toJSON = (points: Points) => {
  if (
    !BreakpointsProvider ||
    !BreakpointsProvider.breakpoints ||
    Object.keys(BreakpointsProvider.breakpoints).length === 0
  ) {
    throw new Error("You don't have any breakpoints defined");
  }
  if (typeof points !== "object") {
    throw new Error("Invalid breakpoints, should be an object");
  }
  let css: CSSinJS = {};
  Object.keys(points).forEach(point => {
    if (!Object.keys(BreakpointsProvider.breakpoints).includes(point)) {
      throw new Error(
        `${point} is not a valid breakpoint\nValid breakpoints are: ${Object.keys(
          BreakpointsProvider.breakpoints
        )}`
      );
    }
    const cssInJs = points[point];
    if (typeof cssInJs === "string") {
      throw new Error("Invalid CSS-in-JS, should be an object");
    }
    const mediaQuery = fromBreakpointToMedia(
      BreakpointsProvider.breakpoints[point]
    );
    if (mediaQuery) {
      css[`@media ${mediaQuery}`] = cssInJs;
    } else {
      css = { ...css, ...cssInJs };
    }
  });
  return css;
};

export default toJSON;
