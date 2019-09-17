import React from "react";

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

const Hook = () => {
  const isXs = useOnly("xs");
  const isSm = useOnly("sm");
  const isMd = useOnly("md");
  const isLg = useOnly("lg");
  const isXl = useOnly("xl");
  const isMedia = useOnly(
    undefined,
    "(min-width:768px) and (max-width:992px),(max-width:576px)"
  );

  const isSmUp = useOnly("smUp");
  return (
    <>
      <h2>useOnly()</h2>
      <p>
        <b>isXs: </b>
        <code>{toString(isXs)}</code>
      </p>
      <p>
        <b>isSm: </b>
        <code>{toString(isSm)}</code>
      </p>
      <p>
        <b>isMd: </b>
        <code>{toString(isMd)}</code>
      </p>
      <p>
        <b>isLg: </b>
        <code>{toString(isLg)}</code>
      </p>
      <p>
        <b>isXl: </b>
        <code>{toString(isXl)}</code>
      </p>
      <p>
        <b>isSmUp: </b>
        <code>{toString(isSmUp)}</code>
      </p>
      <p>
        <b>(min-width:768px) and (max-width:992px),(max-width:576px): </b>
        <code>{toString(isMedia)}</code>
      </p>
    </>
  );
};

export default Hook;
