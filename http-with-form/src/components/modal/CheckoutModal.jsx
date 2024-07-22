import { useContext } from 'react';
import Checkout from '../checkout/Checkout';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import UserProgressContext from '../../context/UserProgressContext';

export default function CheckoutModal() {
  const userProgressCtx = useContext(UserProgressContext);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal
      className='checkout'
      open={userProgressCtx.progress === 'checkout'}
      onClose={
        userProgressCtx.progress === 'checkout' ? handleCloseCheckout : null
      }
    >
      <h2>Checkout</h2>
      <Checkout />
      <p className='modal-actions'>
        <Button
          textOnly
          onClick={handleCloseCheckout}
        >
          Close
        </Button>
        {<Button>Submit Order</Button>}
      </p>
    </Modal>
  );
}
