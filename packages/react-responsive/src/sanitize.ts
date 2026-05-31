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

const listOfSupportedDirections: Directions[] = [
  "width",
  "height",
];

export type ExposedMediaRange =
  | [number, number]
  | [number, number, Units]
  | [
      number,
      number,
      { unit?: Units; direction?: Directions },
    ];

export interface ExposedMediaRanges {
  [key: string]: ExposedMediaRange;
}

export type MediaRange = [
  number,
  number,
  Units,
  Directions,
];

export interface MediaRanges {
  [mediaRange: string]: MediaRange;
}

export function sanitize(
  inMediaRanges: ExposedMediaRanges,
): MediaRanges {
  return Object.keys(inMediaRanges).reduce<MediaRanges>(
    (mediaRanges, mediaRangeName) => {
      const mediaRange = inMediaRanges[mediaRangeName];

      if (
        !Array.isArray(mediaRange) ||
        mediaRange.length <= 1
      ) {
        return mediaRanges;
      }

      const [supposedMin, supposedMax, options, ...rest] =
        mediaRange;
      if (rest.length > 0) {
        const error = new Error(
          `The following fields "${rest}" have been ignored`,
        );
        console.error(error);
      }

      if (
        typeof supposedMin !== "number" ||
        typeof supposedMax !== "number"
      ) {
        return mediaRanges;
      }

      let supposedUnit: Units | undefined = undefined;
      let supposedDirection: Directions | undefined =
        undefined;
      if (typeof options === "string") {
        supposedUnit = options;
      } else if (typeof options === "object") {
        supposedDirection = options.direction;
        supposedUnit = options.unit;
      }

      const min = Math.min(supposedMin, supposedMax);
      const max = Math.max(supposedMin, supposedMax);
      const unit =
        supposedUnit &&
        listOfSupportedUnits.includes(supposedUnit)
          ? supposedUnit
          : "px";
      const direction =
        supposedDirection &&
        listOfSupportedDirections.includes(
          supposedDirection,
        )
          ? supposedDirection
          : "width";

      mediaRanges[mediaRangeName] = [
        min,
        max,
        unit,
        direction,
      ];
      mediaRanges[`${mediaRangeName}Up`] = [
        min,
        Infinity,
        unit,
        direction,
      ];
      mediaRanges[`${mediaRangeName}Down`] = [
        0,
        max,
        unit,
        direction,
      ];

      return mediaRanges;
    },
    {},
  );
}

/** @deprecated Use {@link ExposedMediaRange} instead. */
export type ExposedBreakpoint = ExposedMediaRange;
/** @deprecated Use {@link ExposedMediaRanges} instead. */
export type ExposedBreakpoints = ExposedMediaRanges;
/** @deprecated Use {@link MediaRange} instead. */
export type Breakpoint = MediaRange;
/** @deprecated Use {@link MediaRanges} instead. */
export type Breakpoints = MediaRanges;
