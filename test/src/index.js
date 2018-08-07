import React from 'react';
import ReactDOM from 'react-dom';
import { BreakpointsProvider } from 'react-only';

import List from './List';
import Custom from './Custom';
import MediaQuery from './MediaQuery';

const App = () => (
  <BreakpointsProvider>
    <List />
    <Custom />
    <MediaQuery />
  </BreakpointsProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
