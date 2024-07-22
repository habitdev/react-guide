import { useState } from 'react';
import { createContext } from 'react';
const reducerInit = {};
const contextInit = {
  progress: '', // cart, checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
};
const UserProgressContext = createContext(contextInit);

export function UserProgressContextProvider({ children }) {
  // 간단한 내용이라 reducer대신 state사용
  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    setUserProgress('cart');
  }

  function hideCart() {
    setUserProgress('');
  }
  function showCheckout() {
    setUserProgress('checkout');
  }

  function hideCheckout() {
    setUserProgress('');
  }

  const exportUserProgressContext = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={exportUserProgressContext}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
