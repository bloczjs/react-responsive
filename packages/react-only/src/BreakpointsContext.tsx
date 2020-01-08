import * as React from "react";

import { sanitize, ExposedBreakpoints, Breakpoints } from "./sanitize";

const defaultBreakpoints: ExposedBreakpoints = {
  xs: [0, 575, "px"], // Extra small devices (portrait phones)
  sm: [576, 767, "px"], // Small devices (landscape phones)
  md: [768, 991, "px"], // Medium devices (tablets)
  lg: [992, 1199, "px"], // Large devices (desktops)
  xl: [1200, Infinity, "px"], // Extra large devices (large desktops)
};

export const BreakpointsContext = React.createContext<Breakpoints>(sanitize(defaultBreakpoints));

interface BreakpointsProviderProps {
  breakpoints?: ExposedBreakpoints;
  additionalBreakpoints?: ExposedBreakpoints;
}

export const BreakpointsProvider: React.FunctionComponent<BreakpointsProviderProps> = ({
  breakpoints = defaultBreakpoints,
  additionalBreakpoints = {},
  children,
}) => {
  return (
    <BreakpointsContext.Provider
      value={sanitize({
        ...breakpoints,
        ...additionalBreakpoints,
      })}
    >
      {children}
    </BreakpointsContext.Provider>
  );
};

BreakpointsProvider.displayName = "BreakpointsProvider";
