import * as React from "react";

import { Only } from "./Only";

export interface MatchChildProps {
  strict?: boolean;
  matchMedia?: string;
  only?: string;
}

type Element = React.ReactElement<MatchChildProps & any, string | React.ComponentType<MatchChildProps & any>> | null;

type ParseChildren = (element: Element) => Element;

const parseChildren: ParseChildren = element => {
  if (!element || !element.props) {
    return element;
  }

  const _children: Element | Element[] | null = element.props.children;
  if (!_children) {
    return null;
  }
  const children: Element[] = React.Children.map<Element, Element>(_children, parseChildren);
  const { only, matchMedia, strict, ...props } = element.props;
  const clone = React.createElement(element.type, props, children);
  if (!only && !matchMedia) {
    return clone;
  }
  return (
    <Only on={only || ""} matchMedia={matchMedia || ""} strict={strict}>
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
