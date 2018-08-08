// eslint-disable-next-line
import React from 'react';

import Only from './Only';

const parseChildren = (element) => {
  if (!element.props) {
    return element;
  }
  const children = element.props.children
    ? React.Children.map(element.props.children, parseChildren)
    : null;
  const { only, matchMedia, ...props } = element.props;
  const clone = React.createElement(element.type, props, children);
  if (!only && !matchMedia) {
    return clone;
  }
  return (
    <Only on={only || ''} matchMedia={matchMedia || ''}>
      {clone}
    </Only>
  );
};

export default ({ children }) => React.Children.map(children, parseChildren);
