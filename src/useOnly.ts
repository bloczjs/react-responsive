import * as React from "react";

import { useDebouncedValue } from "./useDebouncedValue";
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
    currentMatchMedia.addEventListener("change", updateMediaQuery);
    mediaQueryListRef.current = currentMatchMedia;
    return () => {
      currentMatchMedia.removeEventListener("change", updateMediaQuery);
    };
  }, [mediaQuery]);

  const debouncedIsShown = useDebouncedValue(isShown, 200);

  return debouncedIsShown;
};
