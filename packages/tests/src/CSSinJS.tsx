import * as React from "react";
import { css } from "@emotion/css";
import {
  BreakpointsContext,
  toCSS as toCSSBreapointless,
  toJSON as toJSONBreapointless,
} from "@blocz/react-responsive";

export default function Sample() {
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
}
