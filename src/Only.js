/* global window */

import { PureComponent } from 'react';

import debounce from './debounce';
import BreakpointsProvider from './BreakpointsProvider';

const fromIntervalToMedia = (interval) => {
  const out = [];
  if (interval[0] !== 0) {
    out.push(`(min-width:${interval[0]}${interval[2]})`);
  }
  if (interval[1] !== Infinity) {
    out.push(`(max-width:${interval[1]}${interval[2]})`);
  }
  if (out.length === 0) {
    return '';
  }
  return out.join(' and ');
};

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
      ...filteredBreakpoints.map(interval => fromIntervalToMedia(interval)),
      matchMedia,
    ]
      .filter(Boolean)
      .join(',');
    this.mediaQueryList = window.matchMedia(mediaQuery);
    this.mediaQueryList.addListener(this.updateMediaQuery);
  };

  updateMediaQuery = debounce((event) => {
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
