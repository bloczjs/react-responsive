import * as React from "react";
import { MediaRangesProvider } from "@blocz/react-responsive";

import List from "./List";
import Custom from "./Custom";
import Hook from "./Hook";
import Height from "./Height";

const App = (
  <MediaRangesProvider
    additionalMediaRanges={{
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
  </MediaRangesProvider>
);

export default App;
