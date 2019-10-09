import React from "react";
import { BreakpointsProvider } from "react-only";

import List from "./List";
import Custom from "./Custom";
import Match from "./Match";
import CustomMatch from "./CustomMatch";
import Hook from "./Hook";

const App = (
  <BreakpointsProvider
    additionalBreakpoints={{
      mobile: [[0, 575], [0, 991]],
      tablet: [[575, 767], [992, 1199]],
      computer: [[768, Infinity], [1200, Infinity]],
    }}
  >
    {/* <List />
    <hr />
    <Custom />
    <hr />
    <Match />
    <hr />
    <CustomMatch />
    <hr /> */}
    <Hook />
  </BreakpointsProvider>
);

export default App;
