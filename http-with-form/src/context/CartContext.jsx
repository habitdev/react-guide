import { createContext, useReducer } from 'react';

const contextInit = {
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
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
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, reducerInit);

  function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  }

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
  };
  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
