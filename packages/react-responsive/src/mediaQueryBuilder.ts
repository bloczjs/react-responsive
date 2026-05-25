import { MediaRanges } from "./sanitize";
import { fromMediaRangeToMedia } from "./fromMediaRangeToMedia";

export function mediaQueryBuilder(mediaRanges: MediaRanges) {
  return function toMediaQuery(on = ""): string {
    if (!on) {
      return "";
    }
    const rawMediaRangeNames = on.split(" ");
    const filteredMediaRanges = rawMediaRangeNames.map((mediaRangeName) => mediaRanges[mediaRangeName]).filter(Boolean);
    const mediaQuery = filteredMediaRanges
      .map((mediaRange) => fromMediaRangeToMedia(mediaRange))
      .filter(Boolean)
      .join(",");
    if (!mediaQuery) {
      const isUniqMediaRange = rawMediaRangeNames.length === 1;
      console.error(
        `"${rawMediaRangeNames.join('", "')}" ${isUniqMediaRange ? "is" : "are"}n't ${
          isUniqMediaRange ? "a " : ""
        }valid media range${isUniqMediaRange ? "" : "s"}`,
      );
    }
    return mediaQuery;
  };
}
