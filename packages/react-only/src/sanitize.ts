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
  "vmax",
];

type Directions = "width" | "height";

const listOfSupportedDirections: Directions[] = ["width", "height"];

export type ExposedBreakpoint =
  | [number, number]
  | [number, number, Units]
  | [number, number, { unit?: Units; direction?: Directions }];

export interface ExposedBreakpoints {
  [key: string]: ExposedBreakpoint;
}

export type Breakpoint = [number, number, Units, Directions];

export interface Breakpoints {
  [breakpoint: string]: Breakpoint;
}

export const sanitize = (inBreakpoints: ExposedBreakpoints) => {
  return Object.keys(inBreakpoints).reduce<Breakpoints>((breakpoints, breakpointName) => {
    const breakpoint = inBreakpoints[breakpointName];

    if (!Array.isArray(breakpoint) || breakpoint.length <= 1) {
      return breakpoints;
    }

    const [supposedMin, supposedMax, options, ...rest] = breakpoint;
    if (rest.length > 0) {
      const error = new Error(`The following fields "${rest}" have been ignored`);
      console.error(error);
    }

    if (typeof supposedMin !== "number" || typeof supposedMax !== "number") {
      return breakpoints;
    }

    let supposedUnit: Units | undefined;
    let supposedDirection: Directions | undefined;
    if (typeof options === "string") {
      supposedUnit = options;
    } else if (typeof options === "object") {
      supposedDirection = options.direction;
      supposedUnit = options.unit;
    }

    const min = Math.min(supposedMin, supposedMax);
    const max = Math.max(supposedMin, supposedMax);
    const unit = supposedUnit && listOfSupportedUnits.includes(supposedUnit) ? supposedUnit : "px";
    const direction =
      supposedDirection && listOfSupportedDirections.includes(supposedDirection) ? supposedDirection : "width";

    breakpoints[breakpointName] = [min, max, unit, direction];
    breakpoints[`${breakpointName}Up`] = [min, Infinity, unit, direction];
    breakpoints[`${breakpointName}Down`] = [0, max, unit, direction];

    return breakpoints;
  }, {});
};
