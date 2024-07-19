import Header from './components/layout/Header';
import Meals from './components/meals/Meals';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
