import * as React from "react";

export const useMediaQuery = (mediaQuery: string): boolean => {
  const mediaQueryList = React.useMemo(() => matchMedia(mediaQuery), [mediaQuery]);
  const [isShown, setIsShown] = React.useState<boolean>(mediaQueryList.matches);

  React.useLayoutEffect(() => {
    setIsShown(mediaQueryList.matches);
    const listener = (event: MediaQueryListEvent) => {
      // Those are important updates, so we don't want to use transitions on them
      setIsShown(event.matches);
    };

    // cannot use addEventListener for IE 11 and safari 13-
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [mediaQueryList]);

  return isShown;
};
