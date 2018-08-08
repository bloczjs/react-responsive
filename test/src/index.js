import React from 'react';
import ReactDOM from 'react-dom';

import List from './List';
import Custom from './Custom';
import MediaQuery from './MediaQuery';

const App = () => (
  <React.Fragment>
    <List />
    <Custom />
    <MediaQuery />
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('root'));
