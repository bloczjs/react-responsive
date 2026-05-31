import type { ExposedMediaRange } from "./sanitize";

export const DEFAULT_MEDIA_RANGES: {
  xs: ExposedMediaRange;
  sm: ExposedMediaRange;
  md: ExposedMediaRange;
  lg: ExposedMediaRange;
  xl: ExposedMediaRange;
} = {
  xs: [0, 575, "px"], // Extra small devices (portrait phones)
  sm: [576, 767, "px"], // Small devices (landscape phones)
  md: [768, 991, "px"], // Medium devices (tablets)
  lg: [992, 1199, "px"], // Large devices (desktops)
  xl: [1200, Infinity, "px"], // Extra large devices (large desktops)
};
