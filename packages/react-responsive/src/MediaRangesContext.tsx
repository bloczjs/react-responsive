import * as React from "react";

import type {
  ExposedMediaRanges,
  MediaRanges,
} from "./sanitize";
import { sanitize } from "./sanitize";
import { DEFAULT_MEDIA_RANGES } from "./defaultMediaRanges";

/**
 * @deprecated Use {@link createMediaRanges} instead. `MediaRangesContext` will be removed in
 * the next major together with {@link MediaRangesProvider}.
 */
export const MediaRangesContext: React.Context<MediaRanges> =
  React.createContext<MediaRanges>(
    sanitize(DEFAULT_MEDIA_RANGES),
  );

interface MediaRangesProviderProps {
  mediaRanges?: ExposedMediaRanges;
  additionalMediaRanges?: ExposedMediaRanges;
}

/** @deprecated Use {@link createMediaRanges} instead. `MediaRangesProvider` will be removed in the next major. */
export function MediaRangesProvider({
  mediaRanges = DEFAULT_MEDIA_RANGES,
  additionalMediaRanges,
  children,
}: React.PropsWithChildren<MediaRangesProviderProps>): React.ReactElement {
  const value = React.useMemo(
    () =>
      sanitize({
        ...mediaRanges,
        ...additionalMediaRanges,
      }),
    [mediaRanges, additionalMediaRanges],
  );
  return (
    <MediaRangesContext.Provider value={value}>
      {children}
    </MediaRangesContext.Provider>
  );
}

/** @deprecated Use {@link MediaRangesContext} instead. */
export const BreakpointsContext: React.Context<MediaRanges> =
  MediaRangesContext;

interface BreakpointsProviderProps {
  /** @deprecated Use `mediaRanges` on `MediaRangesProvider` instead. */
  breakpoints?: ExposedMediaRanges;
  /** @deprecated Use `additionalMediaRanges` on `MediaRangesProvider` instead. */
  additionalBreakpoints?: ExposedMediaRanges;
}

/** @deprecated Use {@link MediaRangesProvider} instead. */
export function BreakpointsProvider({
  breakpoints,
  additionalBreakpoints,
  children,
}: React.PropsWithChildren<BreakpointsProviderProps>): React.ReactElement {
  return (
    <MediaRangesProvider
      mediaRanges={breakpoints}
      additionalMediaRanges={additionalBreakpoints}
    >
      {children}
    </MediaRangesProvider>
  );
}
