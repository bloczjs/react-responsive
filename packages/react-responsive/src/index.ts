export {
  MediaRangesProvider,
  MediaRangesContext,
  // Deprecated aliases — kept for backward compatibility, will be removed in the next major.
  BreakpointsProvider,
  BreakpointsContext,
} from "./MediaRangesContext";
export { Only } from "./Only";
export { useMediaRange, useBreakpoint } from "./useMediaRange";
export { useMediaQuery } from "./useMediaQuery";
export { createMediaRanges } from "./createMediaRanges";
export { DEFAULT_MEDIA_RANGES } from "./defaultMediaRanges";
export type { Units } from "./sanitize";
