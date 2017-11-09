import BreakpointsProvider from './BreakpointsProvider';

const toJSON = (points) => {
  if (
    !BreakpointsProvider ||
    !BreakpointsProvider.breakpoints ||
    Object.keys(BreakpointsProvider.breakpoints).length === 0
  ) {
    return '';
  }
  if (typeof points !== 'object') {
    throw new Error('Invalid breakpoints, should be an object');
  }
  const css = {};
  Object.keys(points).forEach((point) => {
    if (!Object.keys(BreakpointsProvider.breakpoints).includes(point)) {
      throw new Error(`${point} is not a valid breakpoint\nValid breakpoints are: ${Object.keys(BreakpointsProvider.breakpoints)}`);
    }
    if (typeof points[point] !== 'object') {
      throw new Error('Invalid CSS-in-JS, should be an object');
    }
    if (BreakpointsProvider.breakpoints[point][0] === 0) {
      Object.keys(points[point]).forEach((cssParam) => {
        css[cssParam] = points[point][cssParam];
      });
    } else {
      css[
        `@media (min-width: ${BreakpointsProvider.breakpoints[point][0]}${BreakpointsProvider
          .breakpoints[point][2]})`
      ] =
        points[point];
    }
  });
  return css;
};

export default toJSON;
