import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function Root() {
  // const events = useLoaderData();
  // console.log(events); // undefined
  // loader가 path(여기선 events) 아래에 있는 element에서만 사용 가능하기 때문이다

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
