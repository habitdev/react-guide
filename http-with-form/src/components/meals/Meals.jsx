import { useEffect, useState } from 'react';
import Modal from '../../../../http-request/src/components/Modal';
import MealItem from './MealItem';
import Cart from '../cart/Cart';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState(false);
  const [meals, setMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseCart() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch('http://localhost:3000/meals');
        const resData = await response.json();

        if (!response.ok) {
          console.log('not ok');
        }

        setMeals(resData);
        setLoadedMeals(true);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMeals();
  }, []);
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleCloseCart}
      >
        <Cart />
        <div className='cart-item-actions'>
          <button type='button'>Close</button>
          <button
            type='button'
            className='button'
          >
            Go to Checkout
          </button>
        </div>
      </Modal>
      {loadedMeals && (
        <ul id='meals'>
          {meals.map((meal) => (
            <li
              key={meal.id}
              className='meal-item'
            >
              <MealItem meal={meal} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
