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
  // const isXs = useOnly("xs");
  // const isSm = useOnly("sm");
  // const isMd = useOnly("md");
  // const isLg = useOnly("lg");
  // const isXl = useOnly("xl");
  // const isXsUp = useOnly("xsUp");
  // const isSmUp = useOnly("smUp");
  // const isMdUp = useOnly("mdUp");
  // const isLgUp = useOnly("lgUp");
  // const isXlUp = useOnly("xlUp");
  // const isXsDown = useOnly("xsDown");
  // const isSmDown = useOnly("smDown");
  // const isMdDown = useOnly("mdDown");
  // const isLgDown = useOnly("lgDown");
  // const isXlDown = useOnly("xlDown");
  const isMobile = useOnly("mobile");
  const isTablet = useOnly("tablet");
  const isComputer = useOnly("computer");
  const isMobileUp = useOnly("mobileUp");
  const isTabletUp = useOnly("tabletUp");
  const isComputerUp = useOnly("computerUp");
  const isMobileDown = useOnly("mobileDown");
  const isTabletDown = useOnly("tabletDown");
  const isComputerDown = useOnly("computerDown");
  // const isMedia = useOnly(
  //   undefined,
  //   "(min-width:768px) and (max-width:992px),(max-width:576px)",
  // );
  // const isWrong = useOnly("wrong");

  return (
    <>
      <h2>useOnly()</h2>
      {/* <p>
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
      </p> */}
      <p>
        <b>isMobile: </b>
        <code>{toString(isMobile)}</code>
      </p>
      <p>
        <b>isMobileDown: </b>
        <code>{toString(isMobileDown)}</code>
      </p>
      <p>
        <b>isMobileUp: </b>
        <code>{toString(isMobileUp)}</code>
      </p>
      <p>
        <b>isTablet: </b>
        <code>{toString(isTablet)}</code>
      </p>
      <p>
        <b>isTabletDown: </b>
        <code>{toString(isTabletDown)}</code>
      </p>
      <p>
        <b>isTabletUp: </b>
        <code>{toString(isTabletUp)}</code>
      </p>
      <p>
        <b>isComputer: </b>
        <code>{toString(isComputer)}</code>
      </p>
      <p>
        <b>isComputerDown: </b>
        <code>{toString(isComputerDown)}</code>
      </p>
      <p>
        <b>isComputerUp: </b>
        <code>{toString(isComputerUp)}</code>
      </p>
      {/* <p>
        <b>
          (min-width:768px) and
          (max-width:992px),(max-width:576px):{" "}
        </b>
        <code>{toString(isMedia)}</code>
      </p>
      <p>
        <b>wrong media query: </b>
        <code>{toString(isWrong)}</code>
      </p> */}
    </>
  );
};

export default Hook;
