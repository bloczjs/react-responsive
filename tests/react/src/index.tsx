import React from "react";
import ReactDOM from "react-dom";

import List from "./List";
import Custom from "./Custom";
import Match from "./Match";
import Hook from "./Hook";

const App = (
  <React.Fragment>
    <List />
    <hr />
    <Custom />
    <hr />
    <Match />
    <hr />
    <Hook />
  </React.Fragment>
);

ReactDOM.render(App, document.getElementById("root"));
