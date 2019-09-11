import * as React from "react";

import { useOnly } from "./useOnly";

export type OnlyProps<OtherProps = {}> = OtherProps & {
  strict?: boolean;
  matchMedia?: string;
  on?: string;
  as?: string | React.ComponentType<OtherProps>;
};

export function Only<OtherProps = {}>({
  matchMedia,
  on,
  strict,
  as,
  children,
  ...props
}: React.PropsWithChildren<OnlyProps<OtherProps>>) {
  const isShown = useOnly(on, matchMedia, strict);

  if (!isShown) {
    return null;
  }
  return React.createElement(
    as || React.Fragment,
    as ? (props as OtherProps) : undefined,
    children
  );
}

Only.displayName = "Only";
