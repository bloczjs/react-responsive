// @ts-ignore
import { h, Fragment } from "preact";

// @ts-ignore
import { Only } from "./Only";

type Node = {
  attributes?: {
    [key: string]: any;
  };
  nodeName: string;
  children?: Node[];
};

type ParseChildren = (vNode: Node) => Node;
const parseChildren: ParseChildren = (vNode: Node) => {
  if (!vNode || !vNode.attributes) {
    return vNode;
  }
  const children = vNode.children
    ? vNode.children.map<Node>(parseChildren)
    : null;
  const { only, matchMedia, strict, ...attributes } = vNode.attributes;
  const clone = h(vNode.nodeName, attributes, children);
  if (!only && !matchMedia) {
    return clone;
  }
  return (
    // @ts-ignore
    <Only on={only || ""} matchMedia={matchMedia || ""} strict={strict}>
      {clone}
    </Only>
  );
};

interface MatchProps {
  as?: string | React.ComponentType;
  children?: Node[];
}

const Match: React.FunctionComponent<MatchProps> = ({
  children,
  as,
  ...props
}) => {
  if (!children) {
    return null;
  }
  const renderedComp = as || Fragment;
  return h(renderedComp, as ? props : null, children.map(parseChildren));
};

export default Match;
