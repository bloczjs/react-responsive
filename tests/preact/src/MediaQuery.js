import { h } from 'preact';
import { toMediaQuery } from 'react-only/preact';

export default () => <p>{toMediaQuery('md xs')}</p>;
