// eslint-disable-next-line
import React from 'react';

import Only from './Only';

const parseChildren = (element) => {
  if (!element || !element.props) {
    return element;
  }
  const children = element.props.children
    ? React.Children.map(element.props.children, parseChildren)
    : null;
  const {
    only, matchMedia, strict, ...props
  } = element.props;
  const clone = React.createElement(element.type, props, children);
  if (!only && !matchMedia) {
    return clone;
  }
  return (
    <Only on={only || ''} matchMedia={matchMedia || ''} strict={strict}>
      {clone}
    </Only>
  );
};

export default ({ children, as, ...props }) => {
  const computedChildren = React.Children.map(children, parseChildren);
  if (as) {
    return React.createElement(as, props, computedChildren);
  }
  return computedChildren;
};
