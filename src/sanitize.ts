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

const minMax = (input: number[]) => [Math.min(...input), Math.max(...input)];

export type ExposedBreakpoint =
  | [number, number, Units]
  | [number, number]
  | [[number, number], [number, number], Units]
  | [[number, number], [number, number]];
export interface ExposedBreakpoints {
  [key: string]: ExposedBreakpoint;
}

export type Breakpoint = [number, number, Units] | [[number, number], [number, number], Units];
export interface Breakpoints {
  [key: string]: Breakpoint;
}

export const sanitize = (inBreakpoints: ExposedBreakpoints) => {
  return Object.keys(inBreakpoints).reduce<Breakpoints>((breakpoints, breakpointName) => {
    const breakpoint = inBreakpoints[breakpointName];

    if (!Array.isArray(breakpoint) || breakpoint.length <= 1) {
      return breakpoints;
    }

    const [dim1, dim2, supposedUnit, ...rest] = breakpoint;
    if (rest.length > 0) {
      const error = new Error(`The following fields "${rest}" have been ignored`);
      console.error(error);
    }

    const unit: Units = supposedUnit && listOfSupportedUnits.includes(supposedUnit) ? supposedUnit : "px";

    if (typeof dim1 === "number" && typeof dim2 === "number") {
      const [min, max] = minMax([dim1, dim2]);

      breakpoints[breakpointName] = [min, max, unit];
      breakpoints[`${breakpointName}Up`] = [min, Infinity, unit];
      breakpoints[`${breakpointName}Down`] = [0, max, unit];
      return breakpoints;
    }

    if (!Array.isArray(dim1) || !Array.isArray(dim2)) {
      return breakpoints;
    }
    const [supposedMinDim1, supposedMaxDim1] = dim1;
    const [supposedMinDim2, supposedMaxDim2] = dim2;

    if (
      typeof supposedMinDim1 !== "number" ||
      typeof supposedMaxDim1 !== "number" ||
      typeof supposedMinDim2 !== "number" ||
      typeof supposedMaxDim2 !== "number"
    ) {
      return breakpoints;
    }

    const [minDim1, maxDim1] = minMax([supposedMinDim1, supposedMaxDim1]);
    const [minDim2, maxDim2] = minMax([supposedMinDim2, supposedMaxDim2]);

    breakpoints[breakpointName] = [[minDim1, maxDim1], [minDim2, maxDim2], unit];
    breakpoints[`${breakpointName}Up`] = [[minDim1, Infinity], [minDim2, Infinity], unit];
    breakpoints[`${breakpointName}Down`] = [[0, maxDim1], [0, maxDim2], unit];

    return breakpoints;
  }, {});
};
