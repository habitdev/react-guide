import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import CartItem from './CartItem';

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const datas = cartCtx.item;

  return (
    <div className='cart'>
      {datas.map((data) => (
        <CartItem
          name={data.name}
          // price={price}
        />
      ))}
    </div>
  );
}
