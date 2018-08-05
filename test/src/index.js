import React from 'react';
import ReactDOM from 'react-dom';
import { BreakpointsProvider } from 'react-only';

import List from './List';
import Custom from './Custom';

const App = () => (
  <BreakpointsProvider>
    <List />
    <Custom />
  </BreakpointsProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
