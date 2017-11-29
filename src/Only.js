/* global window */

import { PureComponent } from 'react';

import throttle from './throttle';
import BreakpointsProvider from './BreakpointsProvider';
import fromBreakpointToMedia from './fromBreakpointToMedia';

class Only extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { show: false };
    this.mediaQueryList = null;

    this.updateInterval(props);
  }

  componentDidMount() {
    this.updateMediaQuery(this.mediaQueryList);
  }

  componentWillReceiveProps(nextProps) {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeListener(this.updateMediaQuery);
      this.mediaQueryList = null;
    }
    this.updateMediaQuery(nextProps);
  }

  componentWillUnmount() {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeListener(this.updateMediaQuery);
      this.mediaQueryList = null;
    }
  }

  updateInterval = (props = null) => {
    const { children, matchMedia, ...breakpoints } = props;
    const filteredBreakpoints = Object.keys(breakpoints)
      .map(breakpoint =>
        breakpoints[breakpoint] &&
          BreakpointsProvider.breakpoints[breakpoint] &&
          BreakpointsProvider.breakpoints[breakpoint])
      .filter(Boolean);
    const mediaQuery = [
      ...filteredBreakpoints.map(breakpoint => fromBreakpointToMedia(breakpoint)),
      matchMedia,
    ]
      .filter(Boolean)
      .join(',');
    this.mediaQueryList = window.matchMedia(mediaQuery);
    this.mediaQueryList.addListener(this.updateMediaQuery);
  };

  updateMediaQuery = throttle((event) => {
    this.setState((prevState) => {
      const show = event.matches;
      if (show === prevState.show) {
        return null;
      }
      return { show };
    });
  }, 50);

  render() {
    return this.state.show && this.props.children;
  }
}

Only.defaultProps = {
  matchMedia: '',
  children: () => null,
};

export default Only;
