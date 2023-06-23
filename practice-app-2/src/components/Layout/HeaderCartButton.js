import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

function HeaderCartButton(props) {
  // reduce(): 배열의 값을 순회하여 하나의 값을 반환
  // 첫 번째 인수: 함수, 두 번째 인수: 첫 번째 값
  // reduce로 실행하는 함수는 두 개의 인수를 받는다
  const [btnIsHighlight, setBtnIsHighlight] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlight ? classes.bump : ''}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlight(true);

    const timer = setTimeout(() => {
      setBtnIsHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      className={btnClasses}
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
