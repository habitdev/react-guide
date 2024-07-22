import { useEffect, useState } from 'react';
import MealItem from './MealItem';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState(false);
  const [meals, setMeals] = useState([]);

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
