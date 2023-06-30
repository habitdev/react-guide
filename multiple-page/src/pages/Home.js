import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // 네비게이션 동작 트리거
  function navigateHandler() {
    navigate('/products');
  }

  return (
    <>
      <div>Home</div>
      <p>
        go to <Link to='/products'>the list of products</Link>
      </p>
      <p>
        <button
          type='button'
          onClick={navigateHandler}
        >Navigate</button>
      </p>
    </>
  );
}

export default Home;
