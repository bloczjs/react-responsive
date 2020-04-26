import * as React from "react";
import { css } from "emotion";
import {
  BreakpointsContext,
  toCSS as toCSSBreapointless,
  toJSON as toJSONBreapointless,
} from "react-only";

export default () => {
  const breakpoints = React.useContext(BreakpointsContext);
  const toCSS = toCSSBreapointless(breakpoints);
  const toJSON = toJSONBreapointless(breakpoints);
  const styles = {
    mdDown: {
      color: "red",
      ":hover": { color: "blue" },
    },
    lgUp: {
      color: "green",
    },
  };
  return (
    <pre id="css-in-js" className={css(toCSS(styles))}>
      {JSON.stringify(toJSON(styles), null, 4)}
    </pre>
  );
};
