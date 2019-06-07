export enum units {
  em = "em",
  ex = "ex",
  "%" = "%",
  px = "px",
  cm = "cm",
  mm = "mm",
  in = "in",
  pt = "pt",
  pc = "pc",
  ch = "ch",
  rem = "rem",
  vh = "vh",
  vw = "vw",
  vmin = "vmin",
  vmax = "vmax"
}

const listOfSupportedUnits = [
  units.em,
  units.ex,
  units["%"],
  units.px,
  units.cm,
  units.mm,
  units.in,
  units.pt,
  units.pc,
  units.ch,
  units.rem,
  units.vh,
  units.vw,
  units.vmin,
  units.vmax
];

export type Breakpoint = [number, number, units];

export interface Breakpoints {
  [key: string]: Breakpoint;
}

export default (obj: Breakpoints) => {
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
    const unit =
      supposedUnit && listOfSupportedUnits.includes(supposedUnit)
        ? supposedUnit
        : units.px;
    outObj[breakpointName] = [min, max, unit];
    outObj[`${breakpointName}Up`] = [min, Infinity, unit];
    outObj[`${breakpointName}Down`] = [0, max, unit];
  });
  return outObj;
};
