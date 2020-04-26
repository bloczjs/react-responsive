import * as React from "react";
import { BreakpointsProvider } from "react-only";

import List from "./List";
import Custom from "./Custom";
import Match from "./Match";
import CustomMatch from "./MatchCustom";
import Hook from "./Hook";
import Height from "./Height";
import CSSinJS from "./CSSinJS";

const App = (
  <BreakpointsProvider
    additionalBreakpoints={{
      thin: [0, 499.9, { direction: "height" }],
      normal: [500, 899.9, { direction: "height" }],
      big: [900, Infinity, { direction: "height" }],
    }}
  >
    <List />
    <hr />
    <Custom />
    <hr />
    <Match />
    <hr />
    <CustomMatch />
    <hr />
    <Hook />
    <hr />
    <Height />
    <hr />
    <CSSinJS />
  </BreakpointsProvider>
);

export default App;
