import { useContext } from 'react';
import Cart from './cart';
import CartContext from '../context/CartContext';

export default function CartList() {
  const cartCtx = useContext(CartContext);
  const datas = cartCtx.item;

  return (
    <div className='cart'>
      {datas.map((data) => (
        <Cart
          name={data.name}
          // price={price}
        />
      ))}
    </div>
  );
}
