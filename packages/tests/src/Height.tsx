import * as React from "react";

import { useMediaRange } from "@blocz/react-responsive";

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
  const isThin = useMediaRange("thin");
  const isNormal = useMediaRange("normal");
  const isBig = useMediaRange("big");
  const isThinUp = useMediaRange("thinUp");
  const isNormalUp = useMediaRange("normalUp");
  const isBigUp = useMediaRange("bigUp");
  const isThinDown = useMediaRange("thinDown");
  const isNormalDown = useMediaRange("normalDown");
  const isBigDown = useMediaRange("bigDown");

  return (
    <>
      <h2>useMediaRange() with heights</h2>
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
