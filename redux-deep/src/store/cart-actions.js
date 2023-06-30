import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-guide-http-cde47-default-rtdb.firebaseio.com/books.json');

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      // 데이터 베이스에 저장된 장바구니 목록이 없으면
      // 다시 추가 시 오류가 나므로 이를 확인하여
      // 빈 배열이 될 수 있게 한다 => 근데 왜 난 잘 되지..?
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching data failed!',
        })
      );
    }
  };
};

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
        // body: JSON.stringify(cart),
        // changed항목이 데이터 베이스에 들어가지 않게 하기위해
        // 새로운 객체를 생성해 전달한다
        body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
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
