import * as React from "react";

export function useMediaQuery(mediaQuery: string): boolean {
  const mediaQueryList = React.useMemo(() => matchMedia(mediaQuery), [mediaQuery]);

  // Those are important updates, so we don't want to use transitions on them
  return React.useSyncExternalStore(
    React.useCallback(
      (callback) => {
        // cannot use addEventListener for IE 11 and safari 13-
        mediaQueryList.addListener(callback);
        return () => mediaQueryList.removeListener(callback);
      },
      [mediaQueryList],
    ),
    () => mediaQueryList.matches,
    () => mediaQueryList.matches,
  );
}
