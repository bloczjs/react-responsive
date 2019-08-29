import { toJSON, Points, CSSinJS } from "./toJSON";
import { Breakpoints } from "./sanitize";

const toDash = (string: string) =>
  string.replace(/([A-Z])/g, char => `-${char.toLowerCase()}`);

const stringify = (cssObject: CSSinJS) => {
  const array: string[] = Object.keys(cssObject).map(cssAttribute => {
    const value = cssObject[cssAttribute];
    if (typeof value === "string") {
      return `${toDash(cssAttribute)}: ${value};`;
    }
    return `${toDash(cssAttribute)} {${stringify(value)}}`;
  });
  return array.join("");
};

export const toCSS = (breakpoints: Breakpoints) => {
  const JSONBuilder = toJSON(breakpoints);
  return (points: Points) => stringify(JSONBuilder(points));
};
