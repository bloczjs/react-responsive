import BreakpointsProvider from './BreakpointsProvider';
import fromBreakpointToMedia from './fromBreakpointToMedia';

export default (breakpoints, extraMediaQuery = '') => {
  const filteredBreakpoints = breakpoints
    .split(' ')
    .map(breakpoint => BreakpointsProvider.breakpoints[breakpoint])
    .filter(Boolean);
  const mediaQuery = [
    ...filteredBreakpoints.map(breakpoint => fromBreakpointToMedia(breakpoint)),
    extraMediaQuery,
  ]
    .filter(Boolean)
    .join(',');
  return mediaQuery;
};
