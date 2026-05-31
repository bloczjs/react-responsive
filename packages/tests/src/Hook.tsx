import * as React from "react";

import {
  useMediaRange,
  useMediaQuery,
} from "@blocz/react-responsive";

const toString = (value: boolean | undefined) => {
  switch (value) {
    case true:
      return "true";
    case false:
      return "false";
    case undefined:
      return "undefined";
    default:
      return "unknown";
  }
};

const Hook = () => {
  const isXs = useMediaRange("xs");
  const isSm = useMediaRange("sm");
  const isMd = useMediaRange("md");
  const isLg = useMediaRange("lg");
  const isXl = useMediaRange("xl");
  const isXsUp = useMediaRange("xsUp");
  const isSmUp = useMediaRange("smUp");
  const isMdUp = useMediaRange("mdUp");
  const isLgUp = useMediaRange("lgUp");
  const isXlUp = useMediaRange("xlUp");
  const isXsDown = useMediaRange("xsDown");
  const isSmDown = useMediaRange("smDown");
  const isMdDown = useMediaRange("mdDown");
  const isLgDown = useMediaRange("lgDown");
  const isXlDown = useMediaRange("xlDown");
  const isMedia = useMediaQuery(
    "(min-width:768px) and (max-width:992px),(max-width:576px)",
  );
  const isWrongMediaRange = useMediaRange("wrong");
  const isWrongMedia = useMediaQuery("wrong");
  const isEmptyMedia = useMediaQuery("");
  const isAlwaysFalseMedia = useMediaQuery("(max-width:0)");
  const isAlwaysTrueMedia = useMediaQuery("all");

  return (
    <>
      <h2>useMediaRange()</h2>
      <p>
        <b>isXs: </b>
        <code>{toString(isXs)}</code>
      </p>
      <p>
        <b>isXsDown: </b>
        <code>{toString(isXsDown)}</code>
      </p>
      <p>
        <b>isXsUp: </b>
        <code>{toString(isXsUp)}</code>
      </p>
      <p>
        <b>isSm: </b>
        <code>{toString(isSm)}</code>
      </p>
      <p>
        <b>isSmDown: </b>
        <code>{toString(isSmDown)}</code>
      </p>
      <p>
        <b>isSmUp: </b>
        <code>{toString(isSmUp)}</code>
      </p>
      <p>
        <b>isMd: </b>
        <code>{toString(isMd)}</code>
      </p>
      <p>
        <b>isMdDown: </b>
        <code>{toString(isMdDown)}</code>
      </p>
      <p>
        <b>isMdUp: </b>
        <code>{toString(isMdUp)}</code>
      </p>
      <p>
        <b>isLg: </b>
        <code>{toString(isLg)}</code>
      </p>
      <p>
        <b>isLgDown: </b>
        <code>{toString(isLgDown)}</code>
      </p>
      <p>
        <b>isLgUp: </b>
        <code>{toString(isLgUp)}</code>
      </p>
      <p>
        <b>isXl: </b>
        <code>{toString(isXl)}</code>
      </p>
      <p>
        <b>isXlDown: </b>
        <code>{toString(isXlDown)}</code>
      </p>
      <p>
        <b>isXlUp: </b>
        <code>{toString(isXlUp)}</code>
      </p>
      <p>
        <b>
          (min-width:768px) and
          (max-width:992px),(max-width:576px):{" "}
        </b>
        <code>{toString(isMedia)}</code>
      </p>
      <p>
        <b>wrong media range: </b>
        <code>{toString(isWrongMediaRange)}</code>
      </p>
      <p>
        <b>wrong media query: </b>
        <code>{toString(isWrongMedia)}</code>
      </p>
      <p>
        <b>empty media query: </b>
        <code>{toString(isEmptyMedia)}</code>
      </p>
      <p>
        <b>(max-width:0): </b>
        <code>{toString(isAlwaysFalseMedia)}</code>
      </p>
      <p>
        <b>all: </b>
        <code>{toString(isAlwaysTrueMedia)}</code>
      </p>
    </>
  );
};

export default Hook;
