import * as React from "react";

// const startTransitionFallbackForReact17AndBellow = (cb: () => void) => cb();
// // @ts-expect-error not supported yet
// const startTransition = React.startTransition || startTransitionFallbackForReact17AndBellow;

export const useMediaQuery = (mediaQuery: string): boolean => {
  const mediaQueryList = React.useMemo(() => matchMedia(mediaQuery), [mediaQuery]);
  const [isShown, setIsShown] = React.useState<boolean>(mediaQueryList.matches);

  React.useLayoutEffect(() => {
    setIsShown(mediaQueryList.matches);
    const listener = (event: MediaQueryListEvent) => {
      // We use startTransition as those update aren't urgent
      // startTransition(() => {
      setIsShown(event.matches);
      // });
    };

    // cannot use addEventListener for IE 11 and safari 13-
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, [mediaQueryList]);

  return isShown;
};
