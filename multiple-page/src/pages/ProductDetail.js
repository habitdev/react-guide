import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductDetail() {
  const param = useParams();

  return (
    <>
      <h1>ProductDetail</h1>
      <p>{param.productId}</p>
      <p>
        <Link
          to='..'
          relative='path'
        >
          back
        </Link>
        {/* 
          `products/:productId`와 `products/`는 형제이므로 
          상위로 가도록 이동하면 `/`로 이동하게 된다
          => relative='route' 도 동일

          relative='path'일 경우는 세그먼트만 제거하게 된다
         */}
      </p>
    </>
  );
}

export default ProductDetail;
