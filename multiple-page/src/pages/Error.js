import React from 'react';
import Gnb from '../components/Gnb';

function Error() {
  return (
    <>
      <Gnb />
      <main>
        <h1>Error!</h1>
        <p>could not find this page!</p>
      </main>
    </>
  );
}

export default Error;
