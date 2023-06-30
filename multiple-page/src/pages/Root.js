import React from 'react';
import { Outlet } from 'react-router-dom';
import Gnb from '../components/Gnb';

/* 
  Outlet: 
  자녀 엘리먼트들이 어디에 렌더링 되어야 하는 지 표시하는 역할
*/

function RootLayout() {
  return (
    <>
      <Gnb />
      <Outlet />
    </>
  );
}

export default RootLayout;
