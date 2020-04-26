import * as React from "react";

import { useOnly } from "react-only";

const toString = (value: boolean | undefined) => {
  switch (value) {
    case true:
      return "true";
    case false:
      return "false";
    case undefined:
      return "undefined";
  }
};

const Height = () => {
  const isThin = useOnly("thin");
  const isNormal = useOnly("normal");
  const isBig = useOnly("big");
  const isThinUp = useOnly("thinUp");
  const isNormalUp = useOnly("normalUp");
  const isBigUp = useOnly("bigUp");
  const isThinDown = useOnly("thinDown");
  const isNormalDown = useOnly("normalDown");
  const isBigDown = useOnly("bigDown");

  return (
    <>
      <h2>useOnly() with heights</h2>
      <p>
        <b>isThin: </b>
        <code>{toString(isThin)}</code>
      </p>
      <p>
        <b>isThinDown: </b>
        <code>{toString(isThinDown)}</code>
      </p>
      <p>
        <b>isThinUp: </b>
        <code>{toString(isThinUp)}</code>
      </p>
      <p>
        <b>isNormal: </b>
        <code>{toString(isNormal)}</code>
      </p>
      <p>
        <b>isNormalDown: </b>
        <code>{toString(isNormalDown)}</code>
      </p>
      <p>
        <b>isNormalUp: </b>
        <code>{toString(isNormalUp)}</code>
      </p>
      <p>
        <b>isBig: </b>
        <code>{toString(isBig)}</code>
      </p>
      <p>
        <b>isBigDown: </b>
        <code>{toString(isBigDown)}</code>
      </p>
      <p>
        <b>isBigUp: </b>
        <code>{toString(isBigUp)}</code>
      </p>
    </>
  );
};

export default Height;
