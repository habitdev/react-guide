import React from 'react';
import { Link } from 'react-router-dom'; // RouterProvider안에서만 작동한다

import classes from './Gnb.module.css';

function Gnb() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Gnb;
