import React from 'react';
import { NavLink } from 'react-router-dom'; // RouterProvider안에서만 작동한다

import classes from './Gnb.module.css';

/* 

  NavLink는 className 속성을 추가할 경우 이는 클래스를 받는 것이
  아니라 함수를 받는다
  그 함수는 앵커 태그에 추가되어야 하는 css 클래스 이름을 추가할 것이다
  isActive: `react-router-dom`가 제공한다, boolean
  end: url이 to=''안에 있는 글자로 끝나면 true
 */

function Gnb() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? classes.active : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='products'
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Gnb;
