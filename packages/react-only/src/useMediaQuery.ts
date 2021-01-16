import * as React from "react";

export const useMediaQuery = (mediaQuery?: string): boolean => {
  const mediaQueryList = React.useMemo(() => matchMedia(mediaQuery || "-"), [mediaQuery]);
  const [isShown, setIsShown] = React.useState<boolean>(mediaQueryList.matches);

  React.useLayoutEffect(() => {
    setIsShown(mediaQueryList.matches);
    const listener = (event: MediaQueryListEvent) => setIsShown(event.matches);

    // cannot use addEventListener for IE 11 and safari 13-
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [mediaQueryList]);

  return isShown;
};
