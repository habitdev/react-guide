import React from 'react';
import { Link } from 'react-router-dom'; // RouterProvider안에서만 작동한다

function Gnb() {
  return (
    <header>
      <nav>
        <ul>
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
