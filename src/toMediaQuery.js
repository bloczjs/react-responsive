import BreakpointsProvider from './BreakpointsProvider';
import fromBreakpointToMedia from './fromBreakpointToMedia';

export default (breakpoints, extraMediaQuery = '', strict) => {
  const filteredBreakpoints = breakpoints
    .split(' ')
    .map(breakpoint => BreakpointsProvider.breakpoints[breakpoint])
    .filter(Boolean);
  const mediaQuery = [
    ...filteredBreakpoints.map(breakpoint => fromBreakpointToMedia(breakpoint, strict)),
    extraMediaQuery,
  ]
    .filter(Boolean)
    .join(',');
  return mediaQuery;
};
