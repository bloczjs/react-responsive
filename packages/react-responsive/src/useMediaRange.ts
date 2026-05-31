import * as React from "react";

import { MediaRangesContext } from "./MediaRangesContext";
import { useInternalMediaRange } from "./_useInternalMediaRange";

export function useMediaRange(on?: string): boolean {
  const mediaRanges = React.useContext(MediaRangesContext);
  return useInternalMediaRange(mediaRanges, on);
}

/** @deprecated Use {@link useMediaRange} instead. */
export const useBreakpoint: (on?: string) => boolean =
  useMediaRange;
