import * as React from "react";

import { BreakpointsContext } from "./BreakpointsContext";

import { mediaQueryBuilder } from "./mediaQueryBuilder";
import matchMedia from "./matchMediaPonyfill";

export const useOnly = (on?: string, media?: string, strict?: boolean) => {
  const [isShown, setIsShown] = React.useState<boolean | undefined>(undefined);

  const breakpoints = React.useContext(BreakpointsContext);
  const toMediaQuery = React.useMemo(() => mediaQueryBuilder(breakpoints), [
    breakpoints
  ]);

  const mediaQuery: string = React.useMemo(
    () => toMediaQuery(on, media, strict),
    [toMediaQuery, on, media, strict]
  );

  React.useEffect(() => {
    if (!mediaQuery) {
      return;
    }
    const currentMatchMedia = matchMedia(mediaQuery);
    setIsShown(currentMatchMedia.matches);
    const listener = (event: MediaQueryListEvent) => {
      setIsShown(event.matches);
    };
    currentMatchMedia.addListener(listener);
    return () => {
      currentMatchMedia.removeListener(listener);
    };
  }, [mediaQuery]);

  return isShown;
};
