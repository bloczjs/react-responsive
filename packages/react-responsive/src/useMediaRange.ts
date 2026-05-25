import * as React from "react";

import { MediaRangesContext } from "./MediaRangesContext";

import { mediaQueryBuilder } from "./mediaQueryBuilder";

import { useMediaQuery } from "./useMediaQuery";

export function useMediaRange(on?: string): boolean {
  const mediaRanges = React.useContext(MediaRangesContext);
  const toMediaQuery = React.useMemo(() => mediaQueryBuilder(mediaRanges), [mediaRanges]);

  const mediaQuery = React.useMemo(() => toMediaQuery(on), [toMediaQuery, on]);

  return useMediaQuery(mediaQuery || "-");
}

/** @deprecated Use {@link useMediaRange} instead. */
export const useBreakpoint: (on?: string) => boolean = useMediaRange;
