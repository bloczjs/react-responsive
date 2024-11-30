import * as React from "react";
import { BreakpointsProvider } from "@blocz/react-responsive";

import List from "./List";
import Custom from "./Custom";
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
    <Hook />
    <hr />
    <Height />
    <hr />
    <CSSinJS />
  </BreakpointsProvider>
);

export default App;
