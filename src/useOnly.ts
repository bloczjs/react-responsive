import * as React from "react";

import { BreakpointsContext } from "./BreakpointsContext";

import { mediaQueryBuilder } from "./mediaQueryBuilder";
import matchMedia from "./matchMediaPonyfill";

export const useOnly = (on?: string, media?: string, strict?: boolean) => {
  const [isShown, setIsShown] = React.useState<boolean>(false);

  const breakpoints = React.useContext(BreakpointsContext);
  const toMediaQuery = React.useMemo(() => mediaQueryBuilder(breakpoints), [
    breakpoints
  ]);

  const mediaQuery = React.useMemo(() => toMediaQuery(on, media, strict), [
    toMediaQuery,
    on,
    media,
    strict
  ]);

  const mediaQueryListRef = React.useRef<null | MediaQueryList>(null);

  React.useEffect(() => {
    const updateMediaQuery = (evt: MediaQueryListEvent) => {
      const show = evt.matches;
      setIsShown(show);
    };
    const currentMatchMedia = matchMedia(mediaQuery);
    setIsShown(currentMatchMedia.matches);
    currentMatchMedia.addListener(updateMediaQuery);
    mediaQueryListRef.current = currentMatchMedia;
    return () => {
      currentMatchMedia.removeListener(updateMediaQuery);
    };
  }, [mediaQuery]);

  return isShown;
};
