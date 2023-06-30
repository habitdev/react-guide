import React from 'react';
import { Outlet } from 'react-router-dom';
import Gnb from '../components/Gnb';

import classes from './Root.module.css';

/* 
  Outlet: 
  자녀 엘리먼트들이 어디에 렌더링 되어야 하는 지 표시하는 역할
*/

function RootLayout() {
  return (
    <>
      <Gnb />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
