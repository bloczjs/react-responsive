import BreakpointsProvider from './BreakpointsProvider';
import fromBreakpointToMedia from './fromBreakpointToMedia';

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
  let css = {};
  Object.keys(points).forEach((point) => {
    if (!Object.keys(BreakpointsProvider.breakpoints).includes(point)) {
      throw new Error(`${point} is not a valid breakpoint\nValid breakpoints are: ${Object.keys(BreakpointsProvider.breakpoints)}`);
    }
    if (typeof points[point] !== 'object') {
      throw new Error('Invalid CSS-in-JS, should be an object');
    }
    const a = fromBreakpointToMedia(BreakpointsProvider.breakpoints[point]);
    if (a) {
      css[a] = points[point];
    } else {
      css = { ...css, ...points[point] };
    }
  });
  return css;
};

export default toJSON;
