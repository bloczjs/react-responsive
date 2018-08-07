// eslint-disable-next-line
import { PureComponent, createElement } from 'react';

import throttle from './throttle';
import toMediaQuery from './toMediaQuery';

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

  updateInterval = ({ matchMedia, on }) => {
    const mediaQuery = toMediaQuery(on, matchMedia);
    this.mediaQueryList = window.matchMedia(mediaQuery);
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

  updateMediaQuery = throttle(this._updateMediaQuery, 50);

  render() {
    if (!this.state.show) {
      return null;
    }
    const {
      matchMedia, as, on, children, ...props
    } = this.props;
    return as ? createElement(as, props, children) : children;
  }
}

Only.defaultProps = {
  matchMedia: '',
  children: () => null,
  on: '',
};

export default Only;
