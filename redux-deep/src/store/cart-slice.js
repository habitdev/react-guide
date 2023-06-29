import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: Number(newItem.price),
          quantity: Number(1),
          totalPrice: Number(newItem.price),
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending..',
        message: 'sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch('https://react-guide-http-cde47-default-rtdb.firebaseio.com/books.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'sent cart data failed!',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
