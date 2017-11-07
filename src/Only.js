/* global window */

import { PureComponent } from 'react';

import debounce from './debounce';
import breakpoints from './breakpoints';

const union = (intervalA, intervalB) => [
  Math.min(intervalA[0], intervalB[0]),
  Math.max(intervalA[1], intervalB[1]),
];

const computeInterval = (props) => {
  let interval = [Infinity, 0];
  Object.keys(breakpoints).forEach((media) => {
    if (props[media]) {
      interval = union(interval, breakpoints[media]);
    } else if (props[`${media}Up`]) {
      interval = union(interval, [breakpoints[media][0], Infinity]);
    } else if (props[`${media}Down`]) {
      interval = union(interval, [0, breakpoints[media][1]]);
    }
  });
  return interval;
};

class Only extends PureComponent {
  state = { show: false };

  componentDidMount() {
    window.addEventListener('resize', this.updateMediaQuery);
    this.updateInterval();
  }

  componentWillReceiveProps(nextProps) {
    this.updateInterval(nextProps);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMediaQuery);
  }

  updateInterval = (props = null) => {
    const { children, ...medium } = props || this.props;
    this.interval = computeInterval(medium);
    this.updateMediaQuery();
  };

  updateMediaQuery = debounce(() => {
    this.setState((prevState) => {
      const windowWidth = window.innerWidth;
      const show = windowWidth >= this.interval[0] && windowWidth <= this.interval[1];
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
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  xsUp: false,
  smUp: false,
  mdUp: false,
  lgUp: false,
  xlUp: false,
  xsDown: false,
  smDown: false,
  mdDown: false,
  lgDown: false,
  xlDown: false,
  children: () => null,
};

export default Only;
