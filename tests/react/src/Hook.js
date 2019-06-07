import React from 'react';

import { useOnly } from 'react-only';

const Hook = () => {
  const isXs = useOnly('xs');
  const isSm = useOnly('sm');
  const isMd = useOnly('md');
  const isLg = useOnly('lg');
  const isXl = useOnly('xl');
  const isMedia = useOnly(undefined, '(min-width:768px) and (max-width:992px),(max-width:576px)');

  const isSmUp = useOnly('smUp');
  return (
    <React.Fragment>
      <p>
        <b>isXs: </b>
        <code>{isXs ? 'true' : 'false'}</code>
      </p>
      <p>
        <b>isSm: </b>
        <code>{isSm ? 'true' : 'false'}</code>
      </p>
      <p>
        <b>isMd: </b>
        <code>{isMd ? 'true' : 'false'}</code>
      </p>
      <p>
        <b>isLg: </b>
        <code>{isLg ? 'true' : 'false'}</code>
      </p>
      <p>
        <b>isXl: </b>
        <code>{isXl ? 'true' : 'false'}</code>
      </p>
      <p>
        <b>isSmUp: </b>
        <code>{isSmUp ? 'true' : 'false'}</code>
      </p>
      <p>
        <b>(min-width:768px) and (max-width:992px),(max-width:576px): </b>
        <code>{isMedia ? 'true' : 'false'}</code>
      </p>
    </React.Fragment>
  );
};

export default Hook;
