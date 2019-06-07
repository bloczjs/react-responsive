import * as React from "react";

import toMediaQuery from "./toMediaQuery";
import matchMediaNode from "./matchMediaNode";

const globalMatchMedia =
  typeof window !== "undefined" ? window.matchMedia : matchMediaNode;

export interface OnlyProps {
  strict?: boolean;
  matchMedia?: string;
  on?: string;
  as?: string | React.ComponentType;
  [key: string]: any;
}

const Only: React.FunctionComponent<OnlyProps> = ({
  matchMedia,
  on,
  strict,
  as,
  children,
  ...props
}) => {
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

  if (!isShown) {
    return null;
  }
  return React.createElement(as || React.Fragment, as ? props : null, children);
};

Only.displayName = "Only";

export default Only;
