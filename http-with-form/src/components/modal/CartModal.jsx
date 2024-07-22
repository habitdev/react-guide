import { useContext, useEffect } from 'react';
import { currencyFormatter } from '../../util/formatting';
import Cart from '../cart/Cart';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import UserProgressContext from '../../context/UserProgressContext';
import CartContext from '../../context/CartContext';
import { returnEmpty } from '../../util/validation';

export default function CartModal() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartItems = cartCtx.items;
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className='cart'
      open={userProgressCtx.progress === 'cart'}
      onClose={
        userProgressCtx.progress === 'cart' ? handleCloseCart : returnEmpty
      }
    >
      <h2>Your Cart</h2>
      <Cart cartItems={cartItems} />
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button
          textOnly
          onClick={handleCloseCart}
        >
          Close
        </Button>
        {cartItems.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
