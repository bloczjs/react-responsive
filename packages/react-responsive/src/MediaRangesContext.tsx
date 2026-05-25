import * as React from "react";

import { sanitize, ExposedMediaRanges, MediaRanges } from "./sanitize";

const defaultMediaRanges: ExposedMediaRanges = {
  xs: [0, 575, "px"], // Extra small devices (portrait phones)
  sm: [576, 767, "px"], // Small devices (landscape phones)
  md: [768, 991, "px"], // Medium devices (tablets)
  lg: [992, 1199, "px"], // Large devices (desktops)
  xl: [1200, Infinity, "px"], // Extra large devices (large desktops)
};

export const MediaRangesContext: React.Context<MediaRanges> = React.createContext<MediaRanges>(
  sanitize(defaultMediaRanges),
);

interface MediaRangesProviderProps {
  mediaRanges?: ExposedMediaRanges;
  additionalMediaRanges?: ExposedMediaRanges;
}

export function MediaRangesProvider({
  mediaRanges = defaultMediaRanges,
  additionalMediaRanges,
  children,
}: React.PropsWithChildren<MediaRangesProviderProps>): React.ReactElement {
  return (
    <MediaRangesContext.Provider
      value={sanitize({
        ...mediaRanges,
        ...additionalMediaRanges,
      })}
    >
      {children}
    </MediaRangesContext.Provider>
  );
}

/** @deprecated Use {@link MediaRangesContext} instead. */
export const BreakpointsContext: React.Context<MediaRanges> = MediaRangesContext;

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
    <MediaRangesProvider mediaRanges={breakpoints} additionalMediaRanges={additionalBreakpoints}>
      {children}
    </MediaRangesProvider>
  );
}
