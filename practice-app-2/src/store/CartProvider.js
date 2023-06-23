import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
/**
 *
 * @param {*} state : 스냅샷
 * @param {*} action: 코드에 전달되는 액션
 */
function cartReducer(state, action) {
  if (action.type === 'ADD') {
    // concat(): 추가된 항목을 새로운 배열에 담아 반환해준다
    const updatedItems = state.items.concat(action.item);
    const updatedAmount = state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  // 새 state 스냅샷 반환
  return defaultCartState;
}

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    // 일반적으로 action에 객체를 전달한다
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const cartContext = {
    // 기본값
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
}

export default CartProvider;
