import * as React from "react";

import { BreakpointsContext } from "./BreakpointsContext";

import { mediaQueryBuilder } from "./mediaQueryBuilder";

import { useMediaQuery } from "./useMediaQuery";

export const useBreakpoint = (on?: string): boolean => {
  const breakpoints = React.useContext(BreakpointsContext);
  const toMediaQuery = React.useMemo(() => mediaQueryBuilder(breakpoints), [breakpoints]);

  const mediaQuery = React.useMemo(() => toMediaQuery(on), [toMediaQuery, on]);

  return useMediaQuery(mediaQuery || "-");
};
