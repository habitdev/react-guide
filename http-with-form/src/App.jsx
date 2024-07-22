import Header from './components/layout/Header';
import Meals from './components/meals/Meals';
import CartModal from './components/modal/CartModal';
import CheckoutModal from './components/modal/CheckoutModal';
import { CartContextProvider } from './context/CartContext';
import { UserProgressContextProvider } from './context/UserProgressContext';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <main>
          <Meals />
          <CartModal />
          <CheckoutModal />
        </main>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
