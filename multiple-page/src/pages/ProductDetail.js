import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const param = useParams();

  return (
    <>
      <h1>ProductDetail</h1>
      <p>{param.productId}</p>
    </>
  );
}

export default ProductDetail;
