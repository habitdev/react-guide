import { useContext } from 'react';
import logoImage from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../context/CartContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const countCart = cartCtx.items.reduce((totalNumberOfitems, item) => {
    return totalNumberOfitems + item.quantity;
  }, 0);

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
        <Button textOnly>Cart ({countCart})</Button>
      </nav>
    </header>
  );
}
