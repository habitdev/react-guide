import React, { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

function HeaderCartButton(props) {
  // reduce(): 배열의 값을 순회하여 하나의 값을 반환
  // 첫 번째 인수: 함수, 두 번째 인수: 첫 번째 값
  // reduce로 실행하는 함수는 두 개의 인수를 받는다
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button
      className={classes.button}
      onClick={props.onCartClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
