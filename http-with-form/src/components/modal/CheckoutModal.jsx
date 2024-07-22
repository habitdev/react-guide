import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import UserProgressContext from '../../context/UserProgressContext';
import { useInput } from '../../../../form-user-input/src/hooks/useInput';
import { isEmail, isNotEmpty, returnEmpty } from '../../util/validation';
import { currencyFormatter } from '../../util/formatting';

import Button from '../UI/Button';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import useHttp from '../../hook/useHttp';
import Error from '../error';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function CheckoutModal() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: fullnameValue,
    handleInputChange: handleFullnameChange,
    handleInputBlur: handleFullnameBlur,
    hasError: hasFullnameError,
  } = useInput('', (value) => isNotEmpty(value));

  const {
    value: streetValue,
    handleInputChange: handleStreetChange,
    handleInputBlur: handleStreetBlur,
    hasError: hasStreetError,
  } = useInput('', (value) => isNotEmpty(value));

  const {
    value: cityValue,
    handleInputChange: handleCityChange,
    handleInputBlur: handleCityBlur,
    hasError: hasCityError,
  } = useInput('', (value) => isNotEmpty(value));

  const {
    value: postCodeValue,
    handleInputChange: handlePostcodeChange,
    handleInputBlur: handlePostcodeBlur,
    hasError: hasPostcodeError,
  } = useInput('', (value) => isNotEmpty(value));

  function handleSubmit(event) {
    event.preventDefault();
    const fillForm = new FormData(event.target);
    const customData = Object.fromEntries(fillForm.entries());

    if (
      hasEmailError ||
      hasFullnameError ||
      hasStreetError ||
      hasPostcodeError ||
      hasCityError
    ) {
      return;
    }

    sendRequest(
      JSON.stringify({
        order: { items: cartCtx.items, customer: customData },
      })
    );
  }

  let actions = (
    <>
      <Button
        textOnly
        onClick={handleCloseCheckout}
      >
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className='checkout'
      open={userProgressCtx.progress === 'checkout'}
      onClose={
        userProgressCtx.progress === 'checkout'
          ? handleCloseCheckout
          : returnEmpty
      }
    >
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <p>Total Amout: {currencyFormatter.format(cartTotal)}</p>

        <Input
          label='Full Name'
          id='name'
          type='text'
          required
          value={fullnameValue}
          onChange={handleFullnameChange}
          onBlur={handleFullnameBlur}
          error={hasFullnameError && 'Please enter a full name.'}
        />
        <Input
          label='E-mail Address'
          id='email'
          type='email'
          required
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={hasEmailError && 'Please enter a valid email address.'}
        />
        <Input
          label='Street'
          id='street'
          type='text'
          required
          value={streetValue}
          onChange={handleStreetChange}
          onBlur={handleStreetBlur}
          error={hasStreetError && 'Please enter a valid street.'}
        />
        <div className='control-row'>
          <Input
            label='Postal Code'
            id='postal-code'
            type='text'
            required
            value={postCodeValue}
            onChange={handlePostcodeChange}
            onBlur={handlePostcodeBlur}
            error={hasPostcodeError && 'Please enter a post code.'}
          />
          <Input
            label='City'
            id='city'
            type='text'
            required
            value={cityValue}
            onChange={handleCityChange}
            onBlur={handleCityBlur}
            error={hasCityError && 'Please enter a valid street.'}
          />
        </div>

        {error && (
          <Error
            title='Failed to submit order'
            message={error}
          />
        )}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
