import * as React from "react";

import { useBreakpoint } from "./useBreakpoint";
import { useMediaQuery } from "./useMediaQuery";

export type OnlyProps<OtherProps = Record<string, never>> = OtherProps & {
  matchMedia?: string;
  on?: string;
  as?: string | React.ComponentType<OtherProps>;
};

export function Only<OtherProps = Record<string, never>>({
  matchMedia,
  on,
  as,
  children,
  ...props
}: React.PropsWithChildren<OnlyProps<OtherProps>>): React.ReactElement | null {
  const matchOn = useBreakpoint(on);
  const matchQuery = useMediaQuery(matchMedia || "-");
  const isShown = matchOn || matchQuery;

  if (!isShown) {
    return null;
  }

  return React.createElement(
    // @ts-expect-error – this is a complex type
    as || React.Fragment,
    as ? (props as OtherProps) : undefined,
    children,
  );
}

Only.displayName = "Only";
