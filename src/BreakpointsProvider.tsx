import * as React from "react";

import sanitize, { Breakpoints } from "./sanitize";

const defaultBreakpoints: Breakpoints = {
  xs: [0, 575, "px"], // Extra small devices (portrait phones)
  sm: [576, 767, "px"], // Small devices (landscape phones)
  md: [768, 991, "px"], // Medium devices (tablets)
  lg: [992, 1199, "px"], // Large devices (desktops)
  xl: [1200, Infinity, "px"] // Extra large devices (large desktops)
};

interface BreakpointsProviderProps {
  breakpoints: Breakpoints;
  additionalBreakpoints: Breakpoints;
}

class BreakpointsProvider extends React.PureComponent<
  BreakpointsProviderProps
> {
  static breakpoints = sanitize(defaultBreakpoints);

  static defaultProps = {
    breakpoints: defaultBreakpoints,
    additionalBreakpoints: {},
    children: () => null
  };

  constructor(props: Readonly<BreakpointsProviderProps>) {
    super(props);

    const breakpoints = sanitize(props.breakpoints);
    const additionalBreakpoints = sanitize(props.additionalBreakpoints);

    BreakpointsProvider.breakpoints = {
      ...breakpoints,
      ...additionalBreakpoints
    };
  }

  render() {
    return this.props.children;
  }
}

export default BreakpointsProvider;
