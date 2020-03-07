import * as React from "react";

import { BreakpointsContext } from "./BreakpointsContext";

import { mediaQueryBuilder } from "./mediaQueryBuilder";

import { useQuery } from "./useQuery";

export const useOnly = (on?: string, strict?: boolean) => {
  const breakpoints = React.useContext(BreakpointsContext);
  const toMediaQuery = React.useMemo(() => mediaQueryBuilder(breakpoints), [breakpoints]);

  const mediaQuery = React.useMemo(() => toMediaQuery(on, strict), [toMediaQuery, on, strict]);

  return useQuery(mediaQuery);
};
