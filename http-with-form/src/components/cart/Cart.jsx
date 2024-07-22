import { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from '../../context/CartContext';

export default function Cart({ cartItems }) {
  const cartCtx = useContext(CartContext);

  return (
    <ul className='cart-list'>
      {cartItems.map((item) => (
        <li key={item.id}>
          <CartItem
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
            // {...item}
          />
        </li>
      ))}
    </ul>
  );
}
