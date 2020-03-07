import * as React from "react";

export const useQuery = (mediaQuery?: string) => {
  const [isShown, setIsShown] = React.useState<boolean | undefined>(undefined);

  React.useLayoutEffect(() => {
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
