import * as React from "react";

import useDebounce from "./useDebounce";

import toMediaQuery from "./toMediaQuery";
import matchMediaNode from "./matchMediaNode";

const globalMatchMedia =
  typeof window !== "undefined" ? window.matchMedia : matchMediaNode;

const useOnly = (on?: string, matchMedia?: string, strict?: boolean) => {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const mediaQueryListRef = React.useRef<null | MediaQueryList>(null);

  React.useEffect(
    () => {
      const mediaQuery = toMediaQuery(on, matchMedia, strict);
      // @ts-ignore
      const updateMediaQuery: EventListener = (evt: MediaQueryListEvent) => {
        const show = evt.matches;
        setIsShown(show);
      };
      const thisMatchMedia = globalMatchMedia(mediaQuery);
      if (thisMatchMedia.matches) {
        setIsShown(true);
      } else {
        setIsShown(false);
      }
      thisMatchMedia.addListener(updateMediaQuery);
      mediaQueryListRef.current = thisMatchMedia;
      return () => {
        thisMatchMedia.removeListener(updateMediaQuery);
      };
    },
    [matchMedia, on, strict]
  );
  const debouncedIsShown = useDebounce(isShown, 200);

  return debouncedIsShown;
};

export default useOnly;
