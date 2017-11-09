import { Component } from 'react';

const listOfSupportedUnits = [
  'em',
  'ex',
  '%',
  'px',
  'cm',
  'mm',
  'in',
  'pt',
  'pc',
  'ch',
  'rem',
  'vh',
  'vw',
  'vmin',
  'vmax',
];

const sanitize = (obj) => {
  const outObj = {};
  Object.keys(obj).forEach((breakpointName) => {
    const breakpoint = obj[breakpointName];
    if (!Array.isArray(breakpoint) || breakpoint.length <= 1) {
      return;
    }
    const [supposedMin, supposedMax, supposedUnit, ...rest] = breakpoint;
    if (rest.length > 0) {
      const error = new Error(`The following fields "${rest}" have been ignored`);
      console.error(error);
    }
    if (typeof supposedMin !== 'number' || typeof supposedMax !== 'number') {
      return;
    }
    const min = Math.min(supposedMin, supposedMax);
    const max = Math.max(supposedMin, supposedMax);
    const unit = supposedUnit && listOfSupportedUnits.includes(supposedUnit) ? supposedUnit : 'px';
    outObj[breakpointName] = [min, max, unit];
  });
  return outObj;
};

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
