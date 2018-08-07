// eslint-disable-next-line
import { Component } from 'react';

import sanitize from './sanitize';

class BreakpointsProvider extends Component {
  static breakpoints = {};

  constructor(props) {
    super(props);

    const breakpoints = sanitize(props.breakpoints);
    const additionalBreakpoints = sanitize(props.additionalBreakpoints);

    BreakpointsProvider.breakpoints = Object.assign(breakpoints, additionalBreakpoints);
  }
  render() {
    return this.props.children;
  }
}

BreakpointsProvider.defaultProps = {
  breakpoints: {
    xs: [0, 576, 'px'], // Extra small devices (portrait phones)
    sm: [576, 768, 'px'], // Small devices (landscape phones)
    md: [768, 992, 'px'], // Medium devices (tablets)
    lg: [992, 1200, 'px'], // Large devices (desktops)
    xl: [1200, Infinity, 'px'], // Extra large devices (large desktops)
  },
  additionalBreakpoints: {},
  children: () => {},
};

export default BreakpointsProvider;
