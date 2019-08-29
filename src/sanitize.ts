export type Units =
  | "em"
  | "ex"
  | "%"
  | "px"
  | "cm"
  | "mm"
  | "in"
  | "pt"
  | "pc"
  | "ch"
  | "rem"
  | "vh"
  | "vw"
  | "vmin"
  | "vmax";

const listOfSupportedUnits: Units[] = [
  "em",
  "ex",
  "%",
  "px",
  "cm",
  "mm",
  "in",
  "pt",
  "pc",
  "ch",
  "rem",
  "vh",
  "vw",
  "vmin",
  "vmax"
];

export type Breakpoint = [number, number, Units];

export interface Breakpoints {
  [key: string]: Breakpoint;
}

export const sanitize = (obj: Breakpoints) => {
  const outObj: Breakpoints = {};
  Object.keys(obj).forEach(breakpointName => {
    const breakpoint = obj[breakpointName];
    if (!Array.isArray(breakpoint) || breakpoint.length <= 1) {
      return;
    }
    const [supposedMin, supposedMax, supposedUnit, ...rest] = breakpoint;
    if (rest.length > 0) {
      const error = new Error(
        `The following fields "${rest}" have been ignored`
      );
      console.error(error);
    }
    if (typeof supposedMin !== "number" || typeof supposedMax !== "number") {
      return;
    }
    const min = Math.min(supposedMin, supposedMax);
    const max = Math.max(supposedMin, supposedMax);
    const unit: Units =
      supposedUnit && listOfSupportedUnits.includes(supposedUnit)
        ? supposedUnit
        : "px";
    outObj[breakpointName] = [min, max, unit];
    outObj[`${breakpointName}Up`] = [min, Infinity, unit];
    outObj[`${breakpointName}Down`] = [0, max, unit];
  });
  return outObj;
};
