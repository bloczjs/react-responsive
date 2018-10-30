import React from "react";
import ReactDOM from "react-dom";

import List from "./List";
import Custom from "./Custom";
import MediaQuery from "./MediaQuery";
import Match from "./Match";

const App = (
  <React.Fragment>
    <List />
    <Custom />
    <MediaQuery />
    <Match />
  </React.Fragment>
);

ReactDOM.render(App, document.getElementById("root"));
