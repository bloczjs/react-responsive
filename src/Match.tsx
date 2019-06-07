import * as React from "react";

import Only from "./Only";

interface ChildProps {
  strict?: boolean;
  matchMedia?: string;
  only?: string;
  [key: string]: any;
}

type Element = React.ReactElement<
  ChildProps,
  string | React.ComponentType
> | null;

type ParseChildren = (element: Element) => Element;

const parseChildren: ParseChildren = element => {
  if (!element || !element.props) {
    return element;
  }

  const _children: Element | Element[] | null = element.props.children;
  if (!_children) {
    return null;
  }
  const children: Element[] = React.Children.map<Element, Element>(
    _children,
    parseChildren
  );
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
  children: Element | Element[] | null;
  as?: string;
  [key: string]: any;
}

const Match: React.FunctionComponent<MatchProps> = ({
  children,
  as,
  ...props
}) => {
  // @ts-ignore
  const computedChildren = React.Children.map(children, parseChildren);
  if (as) {
    return React.createElement(as, props, computedChildren);
  }
  return React.createElement(React.Fragment, null, computedChildren);
};

Match.displayName = "Match";

export default Match;
