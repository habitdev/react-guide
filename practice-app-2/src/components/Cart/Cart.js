import React from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';

function Cart(props) {
  const cartItems = (
    <ul className={classes['cart-item']}>
      {[
        {
          id: 'c1',
          name: 'Sushi',
          amount: 2,
          price: 12.99,
        },
      ].map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.6</span>
      </div>
      <div className={classes.actions}>
        <button
          type='button'
          onClick={props.onClose}
          className={classes['button--alt']}>
          Close
        </button>
        <button
          type='button'
          className={classes.button}>
          Order
        </button>
      </div>
    </Modal>
  );
}

export default Cart;
