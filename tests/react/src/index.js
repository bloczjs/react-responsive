import React from 'react';
import ReactDOM from 'react-dom';

import List from './List';
import Custom from './Custom';
import MediaQuery from './MediaQuery';
import Match from './Match';
import Hook from './Hook';

const App = (
  <React.Fragment>
    <List />
    <Custom />
    <MediaQuery />
    <Match />
    <Hook />
  </React.Fragment>
);

ReactDOM.render(App, document.getElementById('root'));
