import * as React from "react";

import { Only } from "./Only";

export interface MatchChildProps {
  matchMedia?: string;
  only?: string;
}

/* eslint-disable */
declare global {
  namespace React {
    interface HTMLAttributes<T> extends MatchChildProps {}
  }
}
/* eslint-enable */

type Element = React.ReactElement<MatchChildProps & any, string | React.ComponentType<MatchChildProps & any>> | null;

const parseChildren = (element: Element): Element => {
  if (!element || !element.props) {
    return element;
  }

  const _children: Element | Element[] | null = element.props.children;
  if (!_children) {
    return null;
  }
  const children = React.Children.map(_children, parseChildren);
  const { only, matchMedia, ...props } = element.props;
  const clone = React.createElement(element.type, props, children);
  if (!only && !matchMedia) {
    return clone;
  }
  return (
    <Only on={only || ""} matchMedia={matchMedia || ""}>
      {clone}
    </Only>
  );
};

interface MatchProps {
  [key: string]: any;
  children: Element | Element[] | null;
  as?: string;
}

export const Match: React.FunctionComponent<MatchProps> = ({ children, as, ...props }) => {
  const computedChildren = React.Children.map(children, parseChildren);
  if (as) {
    return React.createElement(as, props, computedChildren);
  }
  return React.createElement(React.Fragment, null, computedChildren);
};

Match.displayName = "Match";
