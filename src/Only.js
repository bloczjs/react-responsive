// eslint-disable-next-line
import { PureComponent, createElement, Fragment } from 'react';

import throttle from './throttle';
import toMediaQuery from './toMediaQuery';
import matchMediaNode from './matchMediaNode';

const globalMatchMedia = typeof window !== "undefined" ? window.matchMedia : matchMediaNode;

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
    this.updateInterval(nextProps);
  }

  componentWillUnmount() {
    if (this.mediaQueryList) {
      this.mediaQueryList.removeListener(this.updateMediaQuery);
      this.mediaQueryList = null;
    }
  }

  updateInterval = ({ matchMedia, on, strict }) => {
    const mediaQuery = toMediaQuery(on, matchMedia, strict);
    this.mediaQueryList = globalMatchMedia(mediaQuery);
    this.mediaQueryList.addListener(this.updateMediaQuery);
  };

  _updateMediaQuery = (event) => {
    this.setState((prevState) => {
      const show = event.matches;
      if (show === prevState.show) {
        return null;
      }
      return { show };
    });
  };

  // eslint-disable-next-line
  updateMediaQuery = throttle(this._updateMediaQuery, 50);

  render() {
    if (!this.state.show) {
      return null;
    }
    const {
      matchMedia, as, on, children, strict, ...props
    } = this.props;
    return createElement(as || Fragment, as ? props : null, children);
  }
}

Only.defaultProps = {
  matchMedia: '',
  children: () => null,
  strict: false,
  on: '',
};

export default Only;
