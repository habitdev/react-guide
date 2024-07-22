import { createContext, useReducer } from 'react';

const contextInit = {
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
};

const reducerInit = {
  items: [],
};

const CartContext = createContext(contextInit);
function cartReducer(state, action) {
  const allItems = [...state.items];

  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingCartItemIndex > -1) {
      const exstingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...exstingItem,
        quantity: exstingItem.quantity + 1,
      };
      allItems[existingCartItemIndex] = updatedItem;
    } else {
      allItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: allItems };
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const exstingItem = state.items[existingCartItemIndex];
    if (exstingItem.quantity === 1) {
      allItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...exstingItem,
        quantity: exstingItem.quantity - 1,
      };

      allItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: allItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, reducerInit);

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  }
  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  const exportCartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={exportCartContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
