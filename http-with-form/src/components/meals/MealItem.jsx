import CartContext from '../../context/CartContext';
import { useContext } from 'react';

import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';

export default function MealItem({ meal, onAddCart }) {
  const cartCtx = useContext(CartContext);
  function handleAddCart() {
    cartCtx.addItem(meal);
  }

  return (
    <>
      <div>
        <article>
          <img
            src={`http://localhost:3000/${meal.image}`}
            alt={meal.name}
          />
          <div className='meal-item-description'>
            <h3>{meal.name}</h3>
            <p className='meal-item-price'>
              {currencyFormatter.format(meal.price)}
            </p>
            <p>{meal.description}</p>
          </div>
          <p className='meal-item-actions'>
            <Button onClick={handleAddCart}>Add to Cart</Button>
          </p>
        </article>
      </div>
    </>
  );
}
