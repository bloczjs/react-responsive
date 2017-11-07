import { Component } from 'react';

class BreakpointsProvider extends Component {
  static breakpoints = {};

  constructor(props) {
    super(props);

    BreakpointsProvider.breakpoints = Object.assign(props.breakpoints, props.additionalBreakpoints);
  }
  render() {
    return this.props.children;
  }
}

BreakpointsProvider.defaultProps = {
  breakpoints: {
    xs: [0, 576], // Extra small devices (portrait phones)
    sm: [576, 768], // Small devices (landscape phones)
    md: [768, 992], // Medium devices (tablets)
    lg: [992, 1200], // Large devices (desktops)
    xl: [1200, Infinity], // Extra large devices (large desktops)
  },
  additionalBreakpoints: {},
  children: () => {},
};

export default BreakpointsProvider;
