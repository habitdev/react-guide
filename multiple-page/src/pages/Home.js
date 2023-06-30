import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div>Home</div>
      <p>
        go to <Link to='/products'>the list of products</Link>
      </p>
    </>
  );
}

export default Home;
