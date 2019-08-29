import React from "react";
import { toMediaQuery, BreakpointsContext } from "react-only";

export default () => {
  const breakpoints = React.useContext(BreakpointsContext);
  return <p>{toMediaQuery(breakpoints)("md xs")}</p>;
};
