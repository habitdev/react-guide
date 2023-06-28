import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length !== 5;

function Checkout(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postCode: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postCodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostCode = postCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostCodeIsValid = !isFiveChars(enteredPostCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postCode: enteredPostCodeIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postcode: enteredPostCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;
  const postCodeControlClasses = `${classes.control} ${formInputsValidity.postCode ? '' : classes.invalid}`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          name='name'
          id='name'
          ref={nameRef}
        />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          name='street'
          id='street'
          ref={streetRef}
        />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postCodeControlClasses}>
        <label htmlFor='Postal Code'>Postal Code</label>
        <input
          type='text'
          name='Postal Code'
          id='Postal Code'
          ref={postCodeRef}
        />
        {!formInputsValidity.postCode && <p>Please enter a valid post code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          name='city'
          id='city'
          ref={cityRef}
        />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button
          type='button'
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button
          type='submit'
          className={classes.submit}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
