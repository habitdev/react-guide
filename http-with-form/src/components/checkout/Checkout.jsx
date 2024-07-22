import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { currencyFormatter } from '../../util/formatting';
import Input from '../UI/Input';

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  return (
    <form>
      <p>Total Amout: {currencyFormatter.format(cartTotal)}</p>

      <Input
        label='Full Name'
        id='full-name'
        type='text'
        required
      />
      <Input
        label='E-mail Address'
        id='email'
        type='email'
        required
      />
      <Input
        label='Street'
        id='street'
        type='text'
        required
      />
      <div className='control-row'>
        <Input
          label='Postal Code'
          id='postal-code'
          type='text'
          required
        />
        <Input
          label='City'
          id='city'
          type='text'
          required
        />
      </div>
    </form>
  );
}
