import { h, Fragment } from 'preact';

import List from './List';
import Custom from './Custom';
import MediaQuery from './MediaQuery';
import Match from './Match';

const App = () => (
  <Fragment>
    <List />
    <Custom />
    <MediaQuery />
    <Match />
  </Fragment>
);

export default App;
