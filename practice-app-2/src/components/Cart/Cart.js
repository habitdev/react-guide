import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    
  }
  const cartItemAddHandler = (id) => {

  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item.id)}
            onRemove={cartItemRemoveHandler.bind(null, item)}
          ></CartItem>
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          type='button'
          onClick={props.onClose}
          className={classes['button--alt']}
        >
          Close
        </button>
        {hasItems && (
          <button
            type='button'
            className={classes.button}
          >
            Order
          </button>
        )}
      </div>
    </Modal>
  );
}

export default Cart;
