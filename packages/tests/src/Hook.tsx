import * as React from "react";

import {
  useBreakpoint,
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
  }
};

const Hook = () => {
  const isXs = useBreakpoint("xs");
  const isSm = useBreakpoint("sm");
  const isMd = useBreakpoint("md");
  const isLg = useBreakpoint("lg");
  const isXl = useBreakpoint("xl");
  const isXsUp = useBreakpoint("xsUp");
  const isSmUp = useBreakpoint("smUp");
  const isMdUp = useBreakpoint("mdUp");
  const isLgUp = useBreakpoint("lgUp");
  const isXlUp = useBreakpoint("xlUp");
  const isXsDown = useBreakpoint("xsDown");
  const isSmDown = useBreakpoint("smDown");
  const isMdDown = useBreakpoint("mdDown");
  const isLgDown = useBreakpoint("lgDown");
  const isXlDown = useBreakpoint("xlDown");
  const isMedia = useMediaQuery(
    "(min-width:768px) and (max-width:992px),(max-width:576px)",
  );
  const isWrongBreakpoint = useBreakpoint("wrong");
  const isWrongMedia = useMediaQuery("wrong");

  return (
    <>
      <h2>useBreakpoint()</h2>
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
        <b>wrong breakpoint: </b>
        <code>{toString(isWrongBreakpoint)}</code>
      </p>
      <p>
        <b>wrong media query: </b>
        <code>{toString(isWrongMedia)}</code>
      </p>
    </>
  );
};

export default Hook;
