import { useContext } from 'react';
import logoImage from '../../assets/logo.jpg';
import Button from '../UI/Button';
import CartContext from '../../context/CartContext';
import UserProgressContext from '../../context/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const countCart = cartCtx.items.reduce((totalNumberOfitems, item) => {
    return totalNumberOfitems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img
          src={logoImage}
          alt='logo'
        />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <Button
          textOnly
          onClick={handleShowCart}
        >
          Cart ({countCart})
        </Button>
      </nav>
    </header>
  );
}
