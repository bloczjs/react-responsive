import * as React from "react";

import { useBreakpoint } from "./useBreakpoint";
import { useMediaQuery } from "./useMediaQuery";

export type OnlyProps<OtherProps = Record<string, never>> = OtherProps & {
  strict?: boolean;
  matchMedia?: string;
  on?: string;
  as?: string | React.ComponentType<OtherProps>;
};

export function Only<OtherProps = Record<string, never>>({
  matchMedia,
  on,
  strict,
  as,
  children,
  ...props
}: React.PropsWithChildren<OnlyProps<OtherProps>>): React.ReactElement | null {
  const matchOn = useBreakpoint(on, strict);
  const matchQuery = useMediaQuery(matchMedia);
  const isShown = matchOn || matchQuery;

  if (!isShown) {
    return null;
  }

  return React.createElement(as || React.Fragment, as ? (props as OtherProps) : undefined, children);
}

Only.displayName = "Only";
