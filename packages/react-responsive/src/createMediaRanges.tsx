import * as React from "react";

import { ExposedMediaRanges, MediaRanges, sanitize } from "./sanitize";
import { ValidatedMediaRangeString } from "./_validateMediaRanges";
import { useInternalMediaRange } from "./_useInternalMediaRange";
import { useMediaQuery } from "./useMediaQuery";

interface OnlyProps<T extends ExposedMediaRanges, S extends string> {
  matchMedia?: string;
  on?: ValidatedMediaRangeString<T, S>;
}

interface CustomMediaRanges<T extends ExposedMediaRanges> {
  useMediaRange: <S extends string>(on: ValidatedMediaRangeString<T, S>) => boolean;
  Only: <S extends string>(props: React.PropsWithChildren<OnlyProps<T, S>>) => React.ReactElement | null;
}

export function createMediaRanges<T extends ExposedMediaRanges>(mediaRanges: T): CustomMediaRanges<T> {
  const sanitized: MediaRanges = sanitize(mediaRanges);

  const useMediaRange: CustomMediaRanges<T>["useMediaRange"] = (on) => useInternalMediaRange(sanitized, on);

  const Only: CustomMediaRanges<T>["Only"] = ({ matchMedia, on, children }) => {
    const matchOn = useInternalMediaRange(sanitized, on);
    const matchQuery = useMediaQuery(matchMedia || "-");
    const isShown = matchOn || matchQuery;

    if (!isShown) {
      return null;
    }

    return <React.Fragment>{children}</React.Fragment>;
  };

  return { useMediaRange, Only };
}
