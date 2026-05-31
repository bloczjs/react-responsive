import * as React from "react";

import type { MediaRanges } from "./sanitize";
import { mediaQueryBuilder } from "./mediaQueryBuilder";
import { useMediaQuery } from "./useMediaQuery";

export function useInternalMediaRange(mediaRanges: MediaRanges, on: string | undefined): boolean {
  const toMediaQuery = React.useMemo(() => mediaQueryBuilder(mediaRanges), [mediaRanges]);
  const mediaQuery = React.useMemo(() => toMediaQuery(on), [toMediaQuery, on]);
  return useMediaQuery(mediaQuery || "-");
}
