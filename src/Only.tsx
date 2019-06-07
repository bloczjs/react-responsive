import * as React from "react";

import useOnly from "./useOnly";

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
  const isShown = useOnly(on, matchMedia, strict);

  if (!isShown) {
    return null;
  }
  return React.createElement(as || React.Fragment, as ? props : null, children);
};

Only.displayName = "Only";

export default Only;
