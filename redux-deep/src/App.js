import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import uiSlice, { uiActions } from './store/ui-slice';

let isInit = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending..',
          message: 'sending cart data!',
        })
      );
      const response = await fetch('https://react-guide-http-cde47-default-rtdb.firebaseio.com/books.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        // throw new Error('Sending cart data failed');
        // dispatch(
        //   uiActions.showNotification({
        //     status: 'error',
        //     title: 'Error!',
        //     message: 'sent cart data failed!',
        //   })
        // );
        // 모든 에러를 잡아내지 않는다
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'sent cart data successfully!',
        })
      );
    };

    if (isInit) {
      isInit = false;
      return;
    }

    sendCartData().catch((error) =>
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'sent cart data failed!',
        })
      )
    );
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
